import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiResponse, ApiTags, ApiOperation} from '@nestjs/swagger'

@ApiTags('App Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary:'Dummy API',
    description:'This api is used to check the connection'
  })
  @ApiResponse({
    status:201,
    description: 'Connection Successfult',
    // type:any
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
