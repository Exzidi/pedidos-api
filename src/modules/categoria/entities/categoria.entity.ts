import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;
}
