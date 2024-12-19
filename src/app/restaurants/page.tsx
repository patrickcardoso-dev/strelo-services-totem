import { getMenuItems } from 'src/api/getMenuItens';
import { getRestaurantsList } from 'src/api/getEntitiesLists';

import RestaurantsList from 'src/components/RestaurantsList';
import NavigationHeader from 'src/components/NavigationHeader';

import './styles.css';

export default async function Restaurants() {
  const menuItems = await getMenuItems();
  const restaurantsList = await getRestaurantsList();

  return (
    <main className="main-area">
      <NavigationHeader menuItems={menuItems} />
      <div className="container">
        <RestaurantsList restaurantsList={restaurantsList} />
      </div>
    </main>
  );
}
