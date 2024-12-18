import { getMenuItems } from 'src/api/getMenuItens';

import FlightsTable from 'src/components/FlightsTable';
import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function Flights() {
  const menuItems = await getMenuItems();
  return (
    <main className="main-area">
      <NavigationHeader menuItems={menuItems} />
      <div className="container">
        <FlightsTable />
      </div>
    </main>
  );
}
