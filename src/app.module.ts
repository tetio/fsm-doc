import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { DocumentModule } from './documents/document.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
