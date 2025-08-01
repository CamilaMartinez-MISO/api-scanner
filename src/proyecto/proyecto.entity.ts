import { Rama } from '../rama/rama.entity';
import { Version } from '../version/version.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Rama, (rama) => rama.proyecto)
    ramas: Rama[];

    @OneToMany(() => Version, (version) => version.proyecto)
    versiones: Version[];
}