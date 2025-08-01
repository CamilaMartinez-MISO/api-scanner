import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @IsNotEmpty()
  numeroVersion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaGuardado: string; // debe ser ISO format: "2025-07-02T20:00:00.000Z"

  @IsInt()
  @IsNotEmpty()
  proyectoId: number;

  @IsInt()
  @IsNotEmpty()
  ramaId: number;
}