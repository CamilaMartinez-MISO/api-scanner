import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto/proyecto.entity';

@Module({
  imports: [ProyectoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'scanner',
      entities: [Proyecto],
      // synchronize: true, // ❗ SOLO PARA DESARROLLO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
