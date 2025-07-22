import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { UrlModule } from '../url/url.module';
import { RedirectModule } from '../redirect/redirect.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        ttl: 60000, // 1 minute
        limit: configService.get<number>('RATE_LIMIT_PER_MINUTE') || 20,
      }],
    }),
    PrismaModule,
    UrlModule,
    RedirectModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
