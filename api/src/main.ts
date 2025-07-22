import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
  const isProduction = nodeEnv === 'production';
  
  // CORS Configuration
  const corsOrigins = configService.get<string>('CORS_ORIGIN')?.split(',') || 
                     ['http://localhost:3000'];
  
  app.enableCors({
    origin: isProduction ? corsOrigins : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Security headers with Helmet
  app.use(helmet({
    contentSecurityPolicy: isProduction ? {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    } : false,
    hsts: isProduction ? {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    } : false,
  }));
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: isProduction,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  // Using explicit controller prefixes instead of global prefix
  // to avoid conflicts with redirect routes
  
  const port = configService.get<number>('PORT') || 3001;
  
  await app.listen(port);
  
  Logger.log(`Application is running on port ${port} in ${nodeEnv} mode`);
}

bootstrap();
