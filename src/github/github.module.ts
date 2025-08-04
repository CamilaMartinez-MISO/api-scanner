// src/github/github.module.ts
import { Module } from '@nestjs/common';
import { GithubAuthService } from './github-auth.service';
import { GithubScannerService } from './github-scanner.service';
import { GithubController } from './github.controller';
import { ProyectoModule } from 'src/proyecto/proyecto.module';
import { RamaModule } from 'src/rama/rama.module';
import { VersionModule } from 'src/version/version.module';

@Module({
  imports: [ProyectoModule, RamaModule, VersionModule],
  providers: [GithubAuthService, GithubScannerService],
  controllers: [GithubController],
  exports: [GithubAuthService, GithubScannerService],
})
export class GithubModule { }