import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesService } from './local/local.service';
import { PrismaService } from './orm/primsa.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PlacesService, PrismaService],
})
export class AppModule {}
