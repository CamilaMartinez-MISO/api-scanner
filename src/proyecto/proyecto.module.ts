import { Module } from '@nestjs/common';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rama } from '../rama/rama.entity';
import { Version } from '../version/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Rama, Version])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}