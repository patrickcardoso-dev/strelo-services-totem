'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { FormControl, ToggleButton, OutlinedInput, InputAdornment } from '@mui/material';

import { standardizeString } from 'src/utils/standardizeString';

import './styles.css';

interface ServicesListProps {
  servicesList: {
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

export default function ServicesList({ servicesList }: ServicesListProps) {
  const filteredStoresList = useMemo(
    () => servicesList.filter((service) => service.segment === 'STORE'),
    [servicesList]
  );
  const filteredServicesList = useMemo(
    () => servicesList.filter((service) => service.segment === 'SERVICE'),
    [servicesList]
  );

  const [selectedViewOption, setSelectedViewOption] = useState<'STORE' | 'SERVICE'>('STORE');
  const [displayedList, setDisplayedList] = useState(filteredStoresList);

  const handleSearch = (searchValue: string) => {
    const results = displayedList.filter((service) =>
      standardizeString(service.name).startsWith(searchValue)
    );
    setDisplayedList(results);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();

    if (searchValue === '') {
      if (selectedViewOption === 'SERVICE') {
        setDisplayedList(filteredServicesList);
      } else if (selectedViewOption === 'STORE') {
        setDisplayedList(filteredStoresList);
      }
      return;
    }

    const standardizedSearchValue = standardizeString(searchValue);

    handleSearch(standardizedSearchValue);
  };

  useEffect(() => {
    if (selectedViewOption === 'SERVICE') {
      setDisplayedList(filteredServicesList);
    } else {
      setDisplayedList(filteredStoresList);
    }
  }, [filteredServicesList, filteredStoresList, selectedViewOption]);

  return (
    <div className="container-area">
      <div className="toggle-button-area">
        <ToggleButton
          color="primary"
          value="STORE"
          selected={selectedViewOption === 'STORE'}
          onChange={() => setSelectedViewOption('STORE')}
          sx={{ width: '50%', textTransform: 'none', fontWeight: 600 }}
        >
          Lojas
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="SERVICE"
          selected={selectedViewOption === 'SERVICE'}
          onChange={() => setSelectedViewOption('SERVICE')}
          sx={{ width: '50%', textTransform: 'none', fontWeight: 600 }}
        >
          Serviços
        </ToggleButton>
      </div>

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
            'aria-label': 'Busca de lojas ou serviços pelo nome',
          }}
          placeholder={
            selectedViewOption === 'STORE' ? 'Busque por uma loja' : 'Busque por um serviço'
          }
          onChange={handleSearchInputChange}
          className="list-search-input"
        />
      </FormControl>

      <div className="list-area">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <nav aria-label="Lista de serviços">
            <List>
              {displayedList.map((service) => (
                <ListItem key={service.id} disablePadding className="list-item-area">
                  <ListItemButton href={`/services/${service.slug}`}>
                    <Image
                      src={service.logo}
                      alt={service.name}
                      width={50}
                      height={50}
                      className="list-item-image"
                    />
                    <ListItemText
                      primary={service.name}
                      secondary={`${service.serviceCategories.join(', ')} - ${service.address}`}
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
