import {
  IsAscii,
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  @IsAscii({ message: 'email must contain only English characters' })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[!-~]{8,}$/, {
    message: 'invalid password',
  })
  password: string;
}
