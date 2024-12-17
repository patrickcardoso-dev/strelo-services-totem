import { PrismaClient } from '@prisma/client';

import HomeMenu from 'src/components/HomeMenu';

import './styles.css';

export async function getItems() {
  const prisma = new PrismaClient();
  const menuItems = await prisma.menuItems.findMany();

  return menuItems;
}

export default async function Home() {
  const menuItems = await getItems();
  return (
    <main className="home-main-area">
      <div className="container">
        <h1 className="home-title">Bem-vindo!</h1>
        <h2 className="home-subtitle">Como podemos ajudá-lo?</h2>

        <HomeMenu menuItems={menuItems} />
      </div>
    </main>
  );
}
