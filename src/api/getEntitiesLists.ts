import { PrismaClient } from '@prisma/client';

export async function getRestaurantsList() {
  const prisma = new PrismaClient();
  const restaurantsList = await prisma.entities.findMany({ where: { segments: 'RESTAURANT' } });

  return restaurantsList;
}

export async function getServicesList() {
  const prisma = new PrismaClient();
  const servicesList = await prisma.entities.findMany({
    where: {
      segments: {
        in: ['STORE', 'SERVICE'],
      },
    },
  });

  return servicesList;
}
