import {
  IsString,
  IsOptional,
  MinLength,
  IsEmail,
  Matches,
  IsAscii,
} from 'class-validator';

export class ValidateRegistrationDto {
  @IsEmail()
  @IsAscii({ message: 'email must contain only English characters' })
  email: string;
}
