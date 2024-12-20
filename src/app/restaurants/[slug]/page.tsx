import { getEntity } from 'src/api/getEntity';
import { getMenuItems } from 'src/api/getMenuItens';

import EntityDetails from 'src/components/EntityDetails';
import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function RestaurantDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menuItems = await getMenuItems();
  const entity = await getEntity(slug);

  if (!entity) {
    return (
      <main className="main-area">
        <NavigationHeader menuItems={menuItems} />

        <div className="container">
          <p>Estabelecimento não encontrado.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-area">
      <NavigationHeader menuItems={menuItems} />

      <div className="container">
        <EntityDetails entityDetails={entity} />
      </div>
    </main>
  );
}
