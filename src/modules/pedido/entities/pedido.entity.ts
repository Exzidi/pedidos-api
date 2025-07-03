import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, {
    cascade: true,
    eager: true,
  })
  detalles: DetallePedido[];

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, { eager: true })
  usuario: Usuario;
}
