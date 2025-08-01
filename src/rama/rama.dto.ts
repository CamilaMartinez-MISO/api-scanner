import { IsString, IsInt } from 'class-validator';

export class CreateRamaDto {
  @IsString()
  nombre: string;

  @IsInt()
  proyectoId: number;
}