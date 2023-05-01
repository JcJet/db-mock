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

  async getMovieById(movieId): Promise<object> {
    const movieFromDb = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
      relations: { genre: true },
    });
    const movieObject = {
      id: movieFromDb.id,
      nameRu: movieFromDb.name,
      nameEn: 'Name in English.',
      type: movieFromDb.type,
      description: movieFromDb.description,
      country: movieFromDb.country,
      genres: movieFromDb.genre,
      trailer: 'https://www.youtube.com/v/Hv3jf9DHFzk',
      similarMovies: await this.movieRepository
        .createQueryBuilder()
        .select()
        .limit(10)
        .execute(),
      startYear: movieFromDb.year,
      endYear: movieFromDb.type == 'movie' ? null : 2023,
      rating: movieFromDb.rating,
      ratingCount: 1337228,
      poster: movieFromDb.poster,
      previewPoster: movieFromDb.previewPoster,
      duration: 182,
      slogan: movieFromDb.slogan,
      director: [
        {
          id: 14189,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_14189.jpg',
          name: 'Лэнс Реддик',
          enName: 'Lance Reddick',
        },
        {
          id: 32491,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_32491.jpg',
          name: 'Уэнделл Пирс',
          enName: 'Wendell Pierce',
        },
      ],
      actors: [
        {
          id: 14189,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_14189.jpg',
          name: 'Лэнс Реддик',
          enName: 'Lance Reddick',
        },
        {
          id: 32491,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_32491.jpg',
          name: 'Уэнделл Пирс',
          enName: 'Wendell Pierce',
        },
        {
          id: 22783,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_22783.jpg',
          name: 'Кларк Питерс',
          enName: 'Clarke Peters',
        },
        {
          id: 1425,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_1425.jpg',
          name: 'Соня Сон',
          enName: 'Sonja Sohn',
        },
        {
          id: 814,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_814.jpg',
          name: 'Дирдри Лавджой',
          enName: 'Deirdre Lovejoy',
        },
        {
          id: 29856,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_29856.jpg',
          name: 'Эйдан Гиллен',
          enName: 'Aidan Gillen',
        },
        {
          id: 17310,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_17310.jpg',
          name: 'Сет Гиллиам',
          enName: 'Seth Gilliam',
        },
        {
          id: 48134,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_48134.jpg',
          name: 'Идрис Эльба',
          enName: 'Idris Elba',
        },
      ],
      producer: [
        {
          id: 17310,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_17310.jpg',
          name: 'Сет Гиллиам',
          enName: 'Seth Gilliam',
        },
        {
          id: 48134,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_48134.jpg',
          name: 'Идрис Эльба',
          enName: 'Idris Elba',
        },
      ],
      cineatographer: [
        {
          id: 17310,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_17310.jpg',
          name: 'Сет Гиллиам',
          enName: 'Seth Gilliam',
        },
        {
          id: 48134,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_48134.jpg',
          name: 'Идрис Эльба',
          enName: 'Idris Elba',
        },
      ],
      screenwriter: [
        {
          id: 17310,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_17310.jpg',
          name: 'Сет Гиллиам',
          enName: 'Seth Gilliam',
        },
        {
          id: 48134,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_48134.jpg',
          name: 'Идрис Эльба',
          enName: 'Idris Elba',
        },
      ],
      composer: [
        {
          id: 17310,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_17310.jpg',
          name: 'Сет Гиллиам',
          enName: 'Seth Gilliam',
        },
        {
          id: 48134,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_48134.jpg',
          name: 'Идрис Эльба',
          enName: 'Idris Elba',
        },
      ],
    };

    return movieObject;
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
        const rightGenres = [
          'боевик',
          'триллер',
          'криминал',
          'комедия',
          'семейный',
          'драма',
          'мелодрама',
          'военный',
          'детектив',
          'спорт',
          'история',
          'фэнтези',
          'фантастика',
          'документальный',
          'ужасы',
          'биография',
          'аниме',
          'мультфильм',
          'новости',
          'приключения',
          'короткометражка',
          'мюзикл',
          'детский',
          'музыка',
          'вестерн',
          'концерт',
          'реальное ТВ',
          'ток-шоу',
          'для взрослых',
          'фильм-нуар',
          'игра',
          'церемония',
        ];
        const genres = [];
        for (const genre of parsedData.genres) {
          if (
            !(await this.genreRepository.findOneBy({
              name: genre.name,
            })) &&
            rightGenres.includes(genre.name)
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
          genres: genres,
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

  async getGenresList() {
    return this.genreRepository.find();
  }

  async getPersonById() {
    const person = {
      id: 10780,
      photo: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_10780.jpg',
      name: 'Доминик Уэст',
      enName: 'Dominic West',
      movies: null,
      description:
        'Some description for movie person. Actually, we did not parse any data like description, so all persons have the same one.',
    };
    person.movies = await this.movieRepository
      .createQueryBuilder('movie')
      .select('movie.*')
      .where({})
      .limit(40)
      .execute();
    return person;
  }
}
