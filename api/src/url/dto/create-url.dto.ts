import { IsString, IsUrl, IsOptional, IsDateString, MaxLength, MinLength, Matches, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUrlDto {
  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: 'URL must be a valid HTTP or HTTPS URL' }
  )
  @MaxLength(2048, { message: 'URL must not exceed 2048 characters' })
  declare originalUrl: string;

  @Transform(({ value }) => value === '' ? undefined : value)
  @ValidateIf((o) => o.customCode !== undefined && o.customCode !== null && o.customCode !== '')
  @IsString()
  @MinLength(3, { message: 'Custom code must be at least 3 characters long' })
  @MaxLength(50, { message: 'Custom code must not exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]$/, {
    message: 'Custom code must start and end with alphanumeric characters and can contain hyphens and underscores'
  })
  customCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}