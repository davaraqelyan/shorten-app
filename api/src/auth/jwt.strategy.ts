import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import type { JwtPayload, AuthUser } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.authService.validateUser(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    return user;
  }
}