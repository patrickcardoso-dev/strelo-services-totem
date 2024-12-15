'use client';

import { useRouter } from 'next/navigation';

import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

export default function GoToHomeButton() {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push('/');
  };

  return (
    <IconButton sx={{ boxShadow: 1 }} onClick={handleNavigateToHome}>
      <HomeIcon />
    </IconButton>
  );
}
