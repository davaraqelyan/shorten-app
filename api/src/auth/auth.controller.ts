import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { AuthenticatedRequest } from './types';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto
  ) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(
    @Request() req: AuthenticatedRequest
  ) {
    return req.user;
  }
}