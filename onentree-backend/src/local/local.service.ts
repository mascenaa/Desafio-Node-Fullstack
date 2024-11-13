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
    const [places, totalPlaces] = await Promise.all([
      this.prisma.places.findMany({
        skip,
        take,
      }),
      this.prisma.places.count(),
    ]);
    const totalPages = Math.ceil(totalPlaces / pageSize);
    return {
      places,
      totalPages,
      totalPlaces,
    };
  }

  async searchBinaryPlaces(name: string) {
    return this.prisma.places.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async createPlaces(data: Prisma.PlacesCreateInput): Promise<Places> {
    return this.prisma.places.create({ data });
  }

  async deletePlaces(where: Prisma.PlacesWhereUniqueInput): Promise<Places> {
    return this.prisma.places.delete({ where });
  }
}
