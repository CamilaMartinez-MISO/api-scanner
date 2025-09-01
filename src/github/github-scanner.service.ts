import { Injectable } from '@nestjs/common';
import { GithubAuthService } from './github-auth.service';
import axios from 'axios';
import { ProyectoService } from '../proyecto/proyecto.service';
import { RamaService } from '../rama/rama.service';
import { VersionService } from '../version/version.service';

@Injectable()
export class GithubScannerService {
    constructor(
        private readonly authService: GithubAuthService,
        private readonly proyectoService: ProyectoService,
        private readonly ramaService: RamaService,
        private readonly versionService: VersionService,
    ) { }

    async escanearRepositorio(owner: string, repo: string, branch: string = 'main') {
        const token = await this.authService.getInstallationAccessToken();

        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contents/package.json?ref=${branch}`,
            {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github+json',
                },
            },
        );

        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(content);

        // Aquí cambias: en lugar de poner "0.0.0", lo dejas como undefined
        const version = packageJson.dependencies?.axios || packageJson.devDependencies?.axios;

        // Si no encontró la librería, NO guardes nada
        if (!version) {
            console.log(`ℹ️ El repo ${repo} no tiene la librería instalada, no se guarda.`);
            return null;
        }

        const proyecto = await this.proyectoService.create(repo);
        const rama = await this.ramaService.create(branch, proyecto.id);
        return this.versionService.create(version, proyecto.id, rama.id);
    }

    async escanearTodosLosRepositorios() {
        const token = await this.authService.getInstallationAccessToken();

        const reposResponse = await axios.get('https://api.github.com/installation/repositories', {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github+json',
            },
        });

        const repos = reposResponse.data.repositories;

        for (const repo of repos) {
            const { name, owner, default_branch } = repo;

            try {
                await this.escanearRepositorio(owner.login, name, default_branch);
                console.log(`✅ ${name} escaneado`);
            } catch (err) {
                console.warn(`❌ Fallo en ${name}: ${err.message}`);
            }
        }

        return { message: 'Escaneo completo de los repos donde está instalada la App' };
    }
}