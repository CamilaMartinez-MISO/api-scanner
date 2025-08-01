// src/version/version.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Rama } from '../rama/rama.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroVersion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaGuardado: Date;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.versiones, { onDelete: 'CASCADE' })
  proyecto: Proyecto;

  @ManyToOne(() => Rama, (rama) => rama.versiones, { onDelete: 'CASCADE' })
  rama: Rama;
}