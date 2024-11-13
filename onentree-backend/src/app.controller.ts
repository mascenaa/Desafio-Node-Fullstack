import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PlacesService } from './local/local.service';
import { Places as PlacesModel, Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly placesService: PlacesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('places/')
  getPlaces(): string {
    return 'List of places';
  }

  @Get('places/:page')
  async getPlacesPaginated(@Param('page') page: number): Promise<{
    places: PlacesModel[];
    totalPages: number;
    totalPlaces: number;
  }> {
    const result = await this.placesService.getPlacesPaginated(page, 10);
    return {
      places: result.places,
      totalPages: result.totalPages,
      totalPlaces: result.totalPlaces,
    };
  }

  @Post('places/')
  createPlaces(@Body() data: Prisma.PlacesCreateInput): Promise<PlacesModel> {
    return this.placesService.createPlaces(data);
  }
}
