import { getMenuItems } from 'src/api/getMenuItens';
import { getServicesList } from 'src/api/getEntitiesLists';

import ServicesList from 'src/components/ServicesList';
import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function Services() {
  const menuItems = await getMenuItems();
  const servicesList = await getServicesList();

  return (
    <main className="main-area">
      <NavigationHeader menuItems={menuItems} />
      <div className="container">
        <ServicesList servicesList={servicesList} />
      </div>
    </main>
  );
}
