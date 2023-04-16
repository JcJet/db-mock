import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMovies(): string {
    return 'Hello World!';
  }
}
