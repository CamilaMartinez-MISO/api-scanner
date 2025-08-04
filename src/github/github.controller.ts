import { Controller, Get, Query } from '@nestjs/common';
import { GithubScannerService } from './github-scanner.service';

@Controller('scanner')
export class GithubController {
    constructor(private readonly scannerService: GithubScannerService) { }

    @Get('repo')
    async escanearUnRepo(
        @Query('owner') owner: string,
        @Query('repo') repo: string,
        @Query('branch') branch: string = 'main',
    ) {
        return this.scannerService.escanearRepositorio(owner, repo, branch);
    }

    @Get('todos')
    async escanearTodosLosRepos() {
        return this.scannerService.escanearTodosLosRepositorios();
    }
}