import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Version } from './version.entity';
import { Repository } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Rama } from '../rama/rama.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepo: Repository<Version>,

    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,

    @InjectRepository(Rama)
    private ramaRepo: Repository<Rama>,
  ) {}

  async create(
    numeroVersion: string,
    proyectoId: number,
    ramaId: number,
  ): Promise<Version> {
    const proyecto = await this.proyectoRepo.findOneBy({ id: proyectoId });
    const rama = await this.ramaRepo.findOneBy({ id: ramaId });

    if (!proyecto) {
      throw new Error(`Proyecto con ID ${proyectoId} no encontrado`);
    }

    if (!rama) {
      throw new Error(`Rama con ID ${ramaId} no encontrada`);
    }

    const nuevaVersion = this.versionRepo.create({
      numeroVersion,
      fechaGuardado: new Date(),
      proyecto,
      rama,
    });

    return this.versionRepo.save(nuevaVersion);
  }

  async findAll(): Promise<Version[]> {
    return this.versionRepo.find({ relations: ['proyecto', 'rama'] });
  }
}