// src/github/github-auth.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as path from 'path';

@Injectable()
export class GithubAuthService {
    private appId = process.env.GITHUB_APP_ID;
    private installationId = process.env.GITHUB_INSTALLATION_ID;
    private privateKeyPath = process.env.GITHUB_PRIVATE_KEY_PATH || './src/github/private-key.pem';

    private generateJwt(): string {
        const rawKey = process.env.GITHUB_PRIVATE_KEY;

        if (!rawKey) {
            throw new Error('❌ La variable de entorno GITHUB_PRIVATE_KEY no está definida');
        }

        const privateKey = rawKey.replace(/\\n/g, '\n');

        const payload = {
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (10 * 60),
            iss: this.appId,
        };

        return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    }

    async getInstallationAccessToken(): Promise<string> {
        const token = this.generateJwt();

        const url = `https://api.github.com/app/installations/${this.installationId}/access_tokens`;

        const response = await axios.post(
            url,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                },
            },
        );

        return response.data.token;
    }
}