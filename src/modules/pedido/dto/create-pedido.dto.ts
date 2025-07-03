import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize } from 'class-validator';
import { CreateDetalleDto } from './create-detalle.dto';

export class CreatePedidoDto {
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleDto)
  @ArrayMinSize(1)
  detalles: CreateDetalleDto[];
}
