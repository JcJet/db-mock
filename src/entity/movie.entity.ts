import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Country } from './country.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  rating: string;

  @Column()
  description: string;

  @Column()
  slogan: string;

  @Column()
  poster: string;

  @Column()
  previewPoster: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genre: Genre[];

  @ManyToMany(() => Country)
  @JoinTable()
  country: Country[];
}
