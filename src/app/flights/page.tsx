import { getMenuItems } from 'src/api/getMenuItens';

import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function Flights() {
  const menuItems = await getMenuItems();
  return <NavigationHeader menuItems={menuItems} />;
}
