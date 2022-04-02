import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthInterceptor } from './util/auth.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,{
    provide:"APP_INTERCEPTOR",
    useClass:AuthInterceptor
  }],
})
export class AppModule {}
