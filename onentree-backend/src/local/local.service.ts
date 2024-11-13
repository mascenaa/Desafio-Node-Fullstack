import { Injectable } from '@nestjs/common';
import { PrismaService } from '../orm/primsa.service';
import { Places, Prisma } from '@prisma/client';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async getPlaces() {
    return this.prisma.places.findMany();
  }

  async getPlacesPaginated(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.prisma.places.findMany({
      skip,
      take,
    });
  }

  async createPlaces(data: Prisma.PlacesCreateInput): Promise<Places> {
    return this.prisma.places.create({ data });
  }

  async deletePlaces(where: Prisma.PlacesWhereUniqueInput): Promise<Places> {
    return this.prisma.places.delete({ where });
  }
}
