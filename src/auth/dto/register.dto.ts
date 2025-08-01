import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  nombre: string;

  @IsString()
  @MinLength(6)
  password: string;
}
