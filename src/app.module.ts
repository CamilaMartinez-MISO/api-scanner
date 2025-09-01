import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto/proyecto.entity';
import { ConfigModule } from '@nestjs/config';
import { RamaModule } from './rama/rama.module';
import { VersionModule } from './version/version.module';
import { Rama } from './rama/rama.entity';
import { Version } from './version/version.entity';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProyectoModule,
    RamaModule,
    VersionModule,
    GithubModule,
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // url: process.env.DATABASE_URL,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'scanner',
      entities: [Proyecto, Rama, Version],
      // ssl: true,
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
      synchronize: true, // ❗ SOLO PARA DESARROLLO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
