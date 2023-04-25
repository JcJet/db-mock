import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from './app.service';
import { GetMoviesDto } from './dto/get-movies.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('movies')
  getMovies(@Query() getMoviesDto: GetMoviesDto) {
    return this.appService.getMovies(getMoviesDto);
  }

  @Get('load_info_into_database')
  loadInfoIntoDatabase() {
    return this.appService.loadInfoIntoDatabase();
  }

  @Get('movies/:id')
  getMovieById(@Param('id') movieId: number) {
    return this.appService.getMovieById(movieId);
  }

  @Get('genres')
  getGenresList() {
    return this.appService.getGenresList();
  }

  @Get('person/:id')
  getPersonById(@Param('id') personId: number) {
    return this.appService.getPersonById();
  }
}
