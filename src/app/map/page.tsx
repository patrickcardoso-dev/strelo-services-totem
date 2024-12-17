import { getMenuItems } from 'src/api/getMenuItens';

import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function Map() {
  const menuItems = await getMenuItems();
  return (
    <main>
      <NavigationHeader menuItems={menuItems} />
      <div className="container iframe-area">
        <iframe
          src="https://salvador-airport-preview.blumaps.com.br/"
          title="Mapa do aeroporto"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </main>
  );
}
