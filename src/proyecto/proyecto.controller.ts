import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  getAll() {
    return this.proyectoService.findAll();
  }

  @Post()
  create(@Body() body: { nombre: string }) {
    return this.proyectoService.create(body.nombre);
  }
}