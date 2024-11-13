import { Module } from '@nestjs/common';
import { PlacesService } from './local.service';

@Module({
  providers: [PlacesService],
  exports: [PlacesService],
})
export class LocalModule {}
