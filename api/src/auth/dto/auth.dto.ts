import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {}
