import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateProductoDto) {
    const categoria = await this.categoriaRepo.findOneBy({
      id: dto.categoriaId,
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const nuevo = this.productoRepo.create({ ...dto, categoria });
    return this.productoRepo.save(nuevo);
  }

  findAll() {
    return this.productoRepo.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepo.findOneBy({
        id: dto.categoriaId,
      });
      if (!categoria)
        throw new NotFoundException('Nueva categoría no encontrada');
      producto.categoria = categoria;
    }

    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepo.remove(producto);
  }
}
