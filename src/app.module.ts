import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { Movie } from './entity/movie.entity';
import { Genre } from './entity/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //'postgres' if using with docker
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'movie',
      entities: [Country, Movie, Genre],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Country, Movie, Genre]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
