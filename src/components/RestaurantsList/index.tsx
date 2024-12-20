'use client';

import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { standardizeString } from 'src/utils/standardizeString';

import './styles.css';

interface RestaurantsListProps {
  restaurantsList: {
    address: string;
    id: string;
    name: string;
    slug: string;
    logo: string;
    segment: string;
    serviceCategories: string[];
    openingHours: string;
    phone: string;
  }[];
}

export default function RestaurantsList({ restaurantsList }: RestaurantsListProps) {
  const [restaurants, setRestaurants] = useState(restaurantsList);

  const handleSearch = (searchValue: string) => {
    const results = restaurants.filter((restaurant) =>
      standardizeString(restaurant.name).startsWith(searchValue)
    );
    setRestaurants(results);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();

    if (searchValue === '') {
      setRestaurants(restaurantsList);
      return;
    }

    const standardizedSearchValue = standardizeString(searchValue);

    handleSearch(standardizedSearchValue);
  };

  return (
    <div className="container-area">
      <FormControl variant="outlined" className="list-form-area">
        <OutlinedInput
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'Busca de estabelecimentos pelo nome',
          }}
          placeholder="Busque um estabelecimento. Ex: Bob's"
          onChange={handleSearchInputChange}
          className="list-search-input"
        />
      </FormControl>

      <div className="list-area">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="Lista de restaurantes">
            <List>
              {restaurants.map((restaurant) => (
                <ListItem key={restaurant.id} disablePadding className="list-item-area">
                  <ListItemButton href={`/restaurants/${restaurant.slug}`}>
                    <Image
                      src={restaurant.logo}
                      alt={restaurant.name}
                      width={50}
                      height={50}
                      className="list-item-image"
                    />
                    <ListItemText
                      primary={restaurant.name}
                      secondary={`${restaurant.serviceCategories.join(', ')} - ${
                        restaurant.address
                      }`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </div>
    </div>
  );
}
