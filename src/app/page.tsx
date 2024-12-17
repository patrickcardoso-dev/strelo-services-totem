import { getMenuItems } from 'src/api/getMenuItens';

import HomeMenu from 'src/components/HomeMenu';

import './styles.css';

export default async function Home() {
  const menuItems = await getMenuItems();
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
