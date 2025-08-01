import { Controller, Post, Get, Body } from '@nestjs/common';
import { RamaService } from './rama.service';
import { Rama } from './rama.entity';
import { CreateRamaDto } from './rama.dto';

@Controller('rama')
export class RamaController {
  constructor(private readonly ramaService: RamaService) {}

  @Post()
  async create(@Body() createRamaDto: CreateRamaDto): Promise<Rama> {
    return this.ramaService.create(createRamaDto.nombre, createRamaDto.proyectoId);
  }
}