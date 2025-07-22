import { Injectable, UnauthorizedException, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { AuthResponse, AuthUser, JwtPayload } from './types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly BCRYPT_ROUNDS = 10;
  private readonly USER_SELECT = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
  };

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, name } = registerDto;

    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        this.logger.warn(`Registration attempt with existing email: ${email}`, {
          email: email.substring(0, 3) + '***@' + email.split('@')[1], // Partial email for privacy
        });
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, this.BCRYPT_ROUNDS);

      // Create user
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: this.USER_SELECT,
      });

      // Generate JWT token
      const access_token = this.generateToken(user);

      this.logger.log(`User registered successfully: ${user.id}`, {
        userId: user.id,
        email: email.substring(0, 3) + '***@' + email.split('@')[1],
      });

      return {
        access_token,
        user,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Re-throw known errors
      }

      const errorDetails = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Registration failed for email: ${email}`, errorDetails, {
        email: email.substring(0, 3) + '***@' + email.split('@')[1],
        errorType: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
      });

      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    try {
      // Find user
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        this.logger.warn(`Login attempt with non-existent email: ${email}`, {
          email: email.substring(0, 3) + '***@' + email.split('@')[1],
          timestamp: new Date().toISOString(),
        });
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login attempt with invalid password for user: ${user.id}`, {
          userId: user.id,
          email: email.substring(0, 3) + '***@' + email.split('@')[1],
          timestamp: new Date().toISOString(),
        });
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const access_token = this.generateToken(user);

      this.logger.log(`User logged in successfully: ${user.id}`, {
        userId: user.id,
        email: email.substring(0, 3) + '***@' + email.split('@')[1],
      });

      return {
        access_token,
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error; // Re-throw known errors
      }

      const errorDetails = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Login failed for email: ${email}`, errorDetails, {
        email: email.substring(0, 3) + '***@' + email.split('@')[1],
        errorType: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
      });

      throw new InternalServerErrorException('Login failed');
    }
  }

  async validateUser(userId: string): Promise<AuthUser | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: this.USER_SELECT,
      });

      if (!user) {
        this.logger.warn(`User validation failed - user not found: ${userId}`, {
          userId,
        });
        return null;
      }

      this.logger.debug(`User validated successfully: ${userId}`, {
        userId,
      });

      return user;
    } catch (error) {
      const errorDetails = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`User validation error for userId: ${userId}`, errorDetails, {
        userId,
        errorType: errorDetails.constructor.name,
        errorMessage: errorDetails.message,
      });

      return null; // Return null on error to handle gracefully
    }
  }

  private generateToken(user: AuthUser): string {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}