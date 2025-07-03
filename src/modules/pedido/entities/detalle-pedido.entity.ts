import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;

  @ManyToOne(() => Producto)
  producto: Producto;
}
