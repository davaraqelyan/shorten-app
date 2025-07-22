import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    const isProduction = configService.get<string>('NODE_ENV') === 'production';
    
    super({
      log: isProduction ? ['error', 'warn'] : ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
      
      // Test the connection
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connection test passed');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Disconnected from database');
    } catch (error) {
      this.logger.error('Error disconnecting from database', error);
    }
  }

  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}