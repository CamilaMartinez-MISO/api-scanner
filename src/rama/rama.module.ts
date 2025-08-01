import { Module } from '@nestjs/common';
import { RamaService } from './rama.service';
import { RamaController } from './rama.controller';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Rama } from './rama.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from '../version/version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Rama, Version])],
  providers: [RamaService],
  controllers: [RamaController]
})
export class RamaModule { }
