import { Controller, Get, Query } from '@nestjs/common';
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
}
