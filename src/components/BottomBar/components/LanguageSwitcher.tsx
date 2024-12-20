'use client';

import Image from 'next/image';
import { useState, MouseEvent } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    handleClose();
  };

  let languageFlag = '/flags/brazil.svg';

  switch (selectedLanguage) {
    case 'Espanhol':
      languageFlag = '/flags/spain.svg';
      break;
    case 'Inglês':
      languageFlag = '/flags/uk.svg';
      break;
    default:
      languageFlag = '/flags/brazil.svg';
      break;
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ boxShadow: 1 }}
      >
        <Image src={languageFlag} alt="" width="24" height="24" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleLanguageSelect('Português')} sx={{ gap: 1 }}>
          <Image src="/flags/brazil.svg" alt="" width="24" height="24" /> Português
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect('Espanhol')} sx={{ gap: 1 }}>
          <Image src="/flags/spain.svg" alt="" width="24" height="24" /> Espanhol
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect('Inglês')} sx={{ gap: 1 }}>
          <Image src="/flags/uk.svg" alt="" width="24" height="24" /> Inglês
        </MenuItem>
      </Menu>
    </div>
  );
}
