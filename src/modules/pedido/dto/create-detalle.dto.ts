import { IsInt, IsPositive } from 'class-validator';

export class CreateDetalleDto {
  @IsInt()
  productoId: number;

  @IsInt()
  @IsPositive()
  cantidad: number;
}
