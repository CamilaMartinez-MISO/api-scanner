import { Controller, Post, Body, Get } from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateVersionDto } from './version.dto';

@Controller('version')
export class VersionController {
    constructor(private readonly versionService: VersionService) { }

    @Post()
    create(@Body() createVersionDto: CreateVersionDto) {
        const { numeroVersion, proyectoId, ramaId } = createVersionDto;
        return this.versionService.create(numeroVersion, proyectoId, ramaId);
    }

    @Get()
    findAll() {
      return this.versionService.findAll();
    }
}