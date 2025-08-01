import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from 'src/proyecto/proyecto.entity';
import { Rama } from 'src/rama/rama.entity';
import { Version } from './version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Rama, Version])],
  providers: [VersionService],
  controllers: [VersionController]
})
export class VersionModule { }
