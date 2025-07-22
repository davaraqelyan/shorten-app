import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/types';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async createShortUrl(
    @Body(ValidationPipe) createUrlDto: CreateUrlDto,
    @Request() req: AuthenticatedRequest
  ): Promise<UrlResponseDto> {
    return this.urlService.create(createUrlDto, req.user.id);
  }

  @Get('info/:shortCode')
  async getUrlInfo(
    @Param('shortCode') shortCode: string,
    @Request() req: AuthenticatedRequest
  ): Promise<UrlResponseDto> {
    return this.urlService.getUrlInfo(shortCode, req.user.id);
  }

  @Get('my-urls')
  async getMyUrls(
    @Request() req: AuthenticatedRequest
  ): Promise<UrlResponseDto[]> {
    return this.urlService.getUserUrls(req.user.id);
  }

  @Delete('url/:id')
  async deleteUrl(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest
  ): Promise<void> {
    return this.urlService.deleteUrl(id, req.user.id);
  }

}