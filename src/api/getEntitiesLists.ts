import { PrismaClient } from '@prisma/client';

export async function getRestaurantsList() {
  const prisma = new PrismaClient();
  const restaurantsList = await prisma.entities.findMany({ where: { segments: 'RESTAURANT' } });

  return restaurantsList;
}
