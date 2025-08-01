import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rama } from './rama.entity';
import { Repository } from 'typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity';

@Injectable()
export class RamaService {
  constructor(
    @InjectRepository(Rama)
    private readonly ramaRepo: Repository<Rama>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
  ) {}

  async create(nombre: string, proyectoId: number): Promise<Rama> {
    const proyecto = await this.proyectoRepo.findOneBy({ id: proyectoId });
  
    if (!proyecto) {
      throw new Error(`No se encontró el proyecto con ID ${proyectoId}`);
    }
  
    const nuevaRama = this.ramaRepo.create({ nombre, proyecto });
    return this.ramaRepo.save(nuevaRama);
  }
}