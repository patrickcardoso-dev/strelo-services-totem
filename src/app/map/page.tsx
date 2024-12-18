import { getMenuItems } from 'src/api/getMenuItens';

import MapIframe from 'src/components/MapIframe';
import NavigationHeader from 'src/components/NavigationHeader';

export default async function Map() {
  const menuItems = await getMenuItems();

  return (
    <main>
      <NavigationHeader menuItems={menuItems} />
      <MapIframe />
    </main>
  );
}
