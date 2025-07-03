import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  findAll(): Promise<Proyecto[]> {
    return this.proyectoRepo.find();
  }

  create(nombre: string): Promise<Proyecto> {
    const nuevo = this.proyectoRepo.create({ nombre });
    return this.proyectoRepo.save(nuevo);
  }
}