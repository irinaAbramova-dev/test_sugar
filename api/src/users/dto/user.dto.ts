import { ApiProperty } from '@nestjs/swagger';
import {IsAscii, IsEmail, IsOptional, IsString} from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsEmail()
  @IsAscii({ message: 'email must contain only English characters' })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  salt?: string;
}
