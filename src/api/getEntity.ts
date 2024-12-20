import { PrismaClient } from '@prisma/client';

export async function getEntity(slug: string) {
  const prisma = new PrismaClient();

  const entity = await prisma.entities.findFirst({
    where: {
      slug,
    },
  });

  return entity;
}
