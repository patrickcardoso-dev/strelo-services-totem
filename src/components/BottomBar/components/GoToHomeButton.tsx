import Link from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

export default function GoToHomeButton() {
  return (
    <Link href="/" passHref prefetch={false}>
      <IconButton sx={{ boxShadow: 1 }}>
        <HomeIcon />
      </IconButton>
    </Link>
  );
}
