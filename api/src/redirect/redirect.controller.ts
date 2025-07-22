import { Controller, Get, Param, Res, Req, Logger } from '@nestjs/common';
import type { Response, Request } from 'express';
import { UrlService } from '../url/url.service';

@Controller()
export class RedirectController {
  private readonly logger = new Logger(RedirectController.name);

  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const originalUrl = await this.urlService.findByShortCode(shortCode);
      
      // Get analytics data
      const ipAddress = req.ip || (req.socket?.remoteAddress);
      const userAgent = req.get('User-Agent');
      const referrer = req.get('Referrer');
      
      // Record analytics - handle errors gracefully but don't block redirect
      this.recordAnalyticsAsync(shortCode, ipAddress, userAgent, referrer);
      
      return res.redirect(301, originalUrl);
    } catch (error) {
      this.logger.error(`Failed to redirect for short code: ${shortCode}`, error, {
        shortCode,
        userAgent: req.get('User-Agent')?.substring(0, 50),
        ipAddress: req.ip?.substring(0, 8) + '...',
      });
      return res.status(404).json({ message: 'URL not found or has expired' });
    }
  }

  private async recordAnalyticsAsync(
    shortCode: string,
    ipAddress?: string,
    userAgent?: string,
    referrer?: string,
  ): Promise<void> {
    try {
      await this.urlService.recordClick(shortCode, ipAddress, userAgent, referrer);
    } catch (error) {
      // Analytics failure should not affect the redirect
      // Error is already logged by the URL service
      const errorDetails = error instanceof Error ? error : new Error(String(error));
      this.logger.warn(`Analytics recording failed for ${shortCode}, but redirect succeeded`, {
        shortCode,
        errorType: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
      });
    }
  }
}