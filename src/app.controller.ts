import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query() getMoviesDto: getMoviesDto): string {
    return this.appService.getMovies();
  }
}
