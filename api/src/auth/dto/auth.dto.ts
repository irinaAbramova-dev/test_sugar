import { ApiProperty } from '@nestjs/swagger';
import {IsAscii, IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email must contain only English characters.',
    required: true,
  })
  @IsEmail()
  @IsAscii({ message: 'email must contain only English characters' })
  email: string;

  @ApiProperty({
    description: 'Password must contain at least 8 characters, only English characters, large and small letters, numbers and special characters.',
    required: true,
    example: 'Testpass123@',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[!-~]{8,}$/, {
    message: 'invalid password',
  })
  password: string;
}

export class RegisterDto extends LoginDto {}
