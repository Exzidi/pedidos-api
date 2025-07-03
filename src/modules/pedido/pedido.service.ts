import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,

    @InjectRepository(DetallePedido)
    private readonly detalleRepo: Repository<DetallePedido>,

    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreatePedidoDto, userId: number): Promise<Pedido> {
    const usuario = await this.usuarioRepo.findOneBy({ id: userId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const detalles: DetallePedido[] = [];

    let total = 0;
    for (const item of dto.detalles) {
      const producto = await this.productoRepo.findOneBy({
        id: item.productoId,
      });
      if (!producto)
        throw new NotFoundException(`Producto ID ${item.productoId} no existe`);

      const detalle = this.detalleRepo.create({
        producto,
        cantidad: item.cantidad,
        precio_unitario: +producto.precio,
      });

      total += detalle.precio_unitario * detalle.cantidad;
      detalles.push(detalle);
    }

    const pedido = this.pedidoRepo.create({
      usuario,
      fecha: new Date(),
      total,
      detalles,
    });

    return await this.pedidoRepo.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepo.find({
      relations: [
        'usuario',
        'detalles',
        'detalles.producto',
        'detalles.producto.categoria',
      ],
      order: { fecha: 'DESC' },
    });

    return plainToInstance(Pedido, pedidos);
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: [
        'usuario',
        'detalles',
        'detalles.producto',
        'detalles.producto.categoria',
      ],
    });

    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return plainToInstance(Pedido, pedido);
  }

  async findByUsuario(userId: number): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepo.find({
      where: { usuario: { id: userId } },
      relations: [
        'usuario',
        'detalles',
        'detalles.producto',
        'detalles.producto.categoria',
      ],
      order: { fecha: 'DESC' },
    });

    return plainToInstance(Pedido, pedidos);
  }
}
