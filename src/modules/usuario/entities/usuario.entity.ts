import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // ✅ Oculta el password en las respuestas
  password: string;

  @CreateDateColumn()
  creadoEn: Date;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];
}
