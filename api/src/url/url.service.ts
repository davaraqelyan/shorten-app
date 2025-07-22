import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name);
  private readonly maxRetries = 5;
  private readonly shortCodeLength = 8;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUrlDto: CreateUrlDto, userId?: string): Promise<UrlResponseDto> {
    const { originalUrl, customCode, title, description, expiresAt } = createUrlDto;

    if (!this.isValidUrl(originalUrl)) {
      throw new BadRequestException('Invalid URL format');
    }

    const shortCode = customCode 
      ? await this.validateCustomCode(customCode)
      : await this.generateUniqueShortCode();

    const url = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        title,
        description,
        userId,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return this.mapToResponseDto(url);
  }

  async findByShortCode(shortCode: string): Promise<string> {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      throw new NotFoundException('URL has expired');
    }

    return url.originalUrl;
  }

  async getUrlInfo(shortCode: string, userId?: string): Promise<UrlResponseDto> {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
      include: {
        _count: {
          select: { analytics: true }
        }
      }
    });

    if (!url || (userId && url.userId !== userId)) {
      throw new NotFoundException('URL not found');
    }

    const response = this.mapToResponseDto(url);
    response.clickCount = url._count.analytics;
    return response;
  }

  async getUserUrls(userId: string): Promise<UrlResponseDto[]> {
    const urls = await this.prisma.url.findMany({
      where: { userId },
      include: {
        _count: {
          select: { analytics: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return urls.map(url => {
      const response = this.mapToResponseDto(url);
      response.clickCount = url._count.analytics;
      return response;
    });
  }

  async recordClick(shortCode: string, ipAddress?: string, userAgent?: string, referrer?: string): Promise<void> {
    try {
      const url = await this.prisma.url.findUnique({
        where: { shortCode },
      });

      if (!url) {
        const errorMessage = `Attempt to record click for non-existent short code: ${shortCode}`;
        this.logger.warn(errorMessage, {
          shortCode,
          ipAddress: ipAddress?.substring(0, 8) + '...', // Partial IP for privacy
          userAgent: userAgent?.substring(0, 50) + '...', // Truncated for logs
        });
        throw new NotFoundException('URL not found');
      }

      await this.prisma.$transaction([
        this.prisma.url.update({
          where: { shortCode },
          data: { visitCount: { increment: 1 } },
        }),
        this.prisma.urlAnalytics.create({
          data: {
            urlId: url.id,
            ipAddress,
            userAgent,
            referrer,
          },
        }),
      ]);

      this.logger.debug(`Successfully recorded click for ${shortCode}`, {
        shortCode,
        urlId: url.id,
      });
    } catch (error) {
      const errorDetails = error instanceof Error ? error : new Error(String(error));
      const errorContext = {
        shortCode,
        ipAddress: ipAddress?.substring(0, 8) + '...',
        userAgent: userAgent?.substring(0, 50) + '...',
        referrer,
        errorName: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
        stack: errorDetails.stack?.substring(0, 500) + '...', // Truncated stack trace
      };
      
      this.logger.error(`Failed to record click for ${shortCode}`, errorDetails, errorContext);
      
      // Re-throw the error so calling code can decide how to handle it
      throw errorDetails;
    }
  }

  async deleteUrl(id: string, userId: string): Promise<void> {
    try {
      const url = await this.prisma.url.findUnique({
        where: { id },
      });

      if (!url) {
        this.logger.warn(`Delete attempt for non-existent URL: ${id}`, {
          urlId: id,
          userId,
        });
        throw new NotFoundException('URL not found');
      }

      if (url.userId !== userId) {
        this.logger.warn(`Unauthorized delete attempt for URL: ${id}`, {
          urlId: id,
          requestingUserId: userId,
          actualUserId: url.userId,
        });
        throw new NotFoundException('URL not found');
      }

      await this.prisma.$transaction([
        this.prisma.urlAnalytics.deleteMany({
          where: { urlId: id },
        }),
        this.prisma.url.delete({
          where: { id },
        }),
      ]);

      this.logger.log(`URL deleted successfully: ${id}`, {
        urlId: id,
        userId,
        shortCode: url.shortCode,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw known errors
      }

      const errorDetails = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to delete URL: ${id}`, errorDetails, {
        urlId: id,
        userId,
        errorType: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
      });

      throw new InternalServerErrorException('Failed to delete URL');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private async validateCustomCode(customCode: string): Promise<string> {
    const existing = await this.prisma.url.findUnique({
      where: { shortCode: customCode },
    });
    
    if (existing) {
      throw new ConflictException('Custom code already exists');
    }
    
    return customCode;
  }

  private async generateUniqueShortCode(): Promise<string> {
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      const shortCode = nanoid(this.shortCodeLength);
      
      const existing = await this.prisma.url.findUnique({
        where: { shortCode },
      });
      
      if (!existing) {
        return shortCode;
      }
    }
    
    this.logger.error(`Failed to generate unique short code after ${this.maxRetries} attempts`);
    throw new BadRequestException('Failed to generate unique short code');
  }

  private mapToResponseDto(url: any): UrlResponseDto {
    return {
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${this.configService.get<string>('BASE_URL')}/${url.shortCode}`,
      title: url.title,
      description: url.description,
      visitCount: url.visitCount,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
    };
  }
}