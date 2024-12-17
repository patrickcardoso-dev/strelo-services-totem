import { PrismaClient } from '@prisma/client';

export async function getMenuItems() {
  const prisma = new PrismaClient();
  const menuItems = await prisma.menuItems.findMany();

  return menuItems;
}
