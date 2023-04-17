import { Injectable } from '@nestjs/common';
import { GetMoviesDto } from './dto/get-movies.dto';
import * as fsPromises from 'node:fs/promises';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { Country } from './entity/country.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getMovies(getMoviesDto) {
    // const movies = this.movieRepository
    //   .createQueryBuilder('movie')
    //   .innerJoinAndSelect('movie.genre', 'genre')
    //   .innerJoinAndSelect('movie.country', 'country')
    //   .where('movie.year =: year', { year: getMoviesDto.year })
    //   .andWhere('movie.director =: director', {
    //     director: getMoviesDto.director,
    //   })
    //   .getMany();
    return await this.movieRepository.find({
      where: { year: getMoviesDto.year, director: getMoviesDto.director },
      relations: ['genre', 'country'],
    });
    // return movies;
  }

  async loadInfoIntoDatabase() {
    const dir = './src/movies';
    const files = await fsPromises.readdir(dir);
    for (const file of files) {
      try {
        const data = await fsPromises.readFile(`${dir}/${file}`);
        const parsedData = JSON.parse(data.toString());
        //Inserting countries
        const countries = [];
        for (const country of parsedData.countries) {
          if (
            !(await this.countryRepository.findOneBy({
              name: country.name,
            }))
          ) {
            countries.push(
              await this.countryRepository.save({ name: country.name }),
            );
          } else {
            countries.push(
              await this.countryRepository.findOneBy({ name: country.name }),
            );
          }
        }
        //Inserting genres
        const genres = [];
        for (const genre of parsedData.genres) {
          if (
            !(await this.genreRepository.findOneBy({
              name: genre.name,
            }))
          ) {
            genres.push(await this.genreRepository.save({ name: genre.name }));
          } else {
            genres.push(
              await this.genreRepository.findOneBy({ name: genre.name }),
            );
          }
        }
        //Inserting movie
        const movie = {
          name: parsedData.name,
          type: parsedData.type,
          rating: parsedData.rating.kp,
          description: parsedData.description,
          slogan: parsedData.slogan,
          poster: parsedData.poster.url,
          previewPoster: parsedData.poster.previewUrl,
          year: parsedData.year,
          director: null,
        };
        const director = parsedData.persons.find((person) => {
          return person.enProfession == 'director';
        });
        movie.director = director.name;
        if (!(await this.movieRepository.findOneBy({ name: movie.name }))) {
          const newMovie = await this.movieRepository.create(movie);
          newMovie.genre = genres;
          newMovie.country = countries;
          await this.movieRepository.save(newMovie);
        }
        console.log('Я обязательно доделаю...');
      } catch (e) {
        console.log(e);
      }
    }
    return 'Говорим большое спасибо Вове Андрееву за то, что он наколдовал невероятное количество фильмов в короткий срок!';
  }
}
