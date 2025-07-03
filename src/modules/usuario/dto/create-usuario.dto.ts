import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(6)
  password: string;
}
