import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { JwtUser } from '../../auth/interfaces/jwt-user.interface';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  // ✅ Crear un pedido (requiere autenticación)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Request() req: ExpressRequest & { user: JwtUser },
    @Body() dto: CreatePedidoDto,
  ) {
    if (!req.user || typeof req.user.userId !== 'number') {
      throw new UnauthorizedException('Token inválido o userId ausente');
    }
    return this.service.create(dto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mis-pedidos')
  findMyPedidos(@Request() req: ExpressRequest & { user: JwtUser }) {
    if (!req.user || typeof req.user.userId !== 'number') {
      throw new UnauthorizedException('Token inválido o userId ausente');
    }
    return this.service.findByUsuario(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new UnauthorizedException('ID inválido');
    }
    return this.service.findOne(idNumber);
  }
}
