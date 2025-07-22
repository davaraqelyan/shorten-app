import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  declare email: string;

  @IsString()
  @MinLength(1, { message: 'Password is required' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  declare password: string;
}