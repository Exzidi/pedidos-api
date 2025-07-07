import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, DetallePedido, Producto, Usuario]),
    AuthModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
