import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from './util/logger.service';

@Injectable()
export class AppService {
  private logger:LoggerService = new LoggerService('App-Service');
  constructor(){
  }
  getHello(): string {

    for (let index = 0; index < 5; index++) {
     this.logger.log("Hello");
      
    }
    return 'Hello World!';
  }
}
