// src/rama/rama.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';
import { Version } from '../version/version.entity';

@Entity()
export class Rama {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.ramas, { onDelete: 'CASCADE' })
    proyecto: Proyecto;

    @OneToMany(() => Version, (version) => version.rama)
    versiones: Version[];
}