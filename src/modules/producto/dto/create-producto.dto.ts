import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  categoriaId: number;
}
