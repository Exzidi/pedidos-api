import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  create(dto: CreateCategoriaDto) {
    const nueva = this.categoriaRepo.create(dto);
    return this.categoriaRepo.save(nueva);
  }

  findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOneBy({ id });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, dto);
    return this.categoriaRepo.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepo.remove(categoria);
  }
}
