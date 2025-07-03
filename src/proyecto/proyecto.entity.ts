import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}