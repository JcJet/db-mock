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

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  slogan: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ nullable: true })
  previewPoster: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  director: string;

  @ManyToMany((type) => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable()
  genre: Genre[];

  @ManyToMany(() => Country)
  @JoinTable()
  country: Country[];
}
