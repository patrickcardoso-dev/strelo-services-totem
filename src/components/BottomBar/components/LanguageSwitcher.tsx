'use client';

import Image from 'next/image';
import { useState, MouseEvent } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Image src="/flags/brazil.svg" alt="" width="24" height="24" />
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
        <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
          <Image src="/flags/brazil.svg" alt="" width="24" height="24" /> Português
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
          <Image src="/flags/spain.svg" alt="" width="24" height="24" /> Espanhol
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
          <Image src="/flags/uk.svg" alt="" width="24" height="24" /> Inglês
        </MenuItem>
      </Menu>
    </div>
  );
}
