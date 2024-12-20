'use client';

import { useRouter, usePathname } from 'next/navigation';

import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import './styles.css';

interface NavigationHeaderProps {
  menuItems: {
    ref: string;
    id: string;
    label: string;
    icon: string;
    backgroundColor: string;
    textColor: string;
  }[];
}

export default function NavigationHeader({ menuItems }: NavigationHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = menuItems.find((item) => pathname.includes(item.ref));

  return (
    <div className="navigation-header-area" style={{ background: currentPage?.backgroundColor }}>
      <div className="navigation-header-content">
        <IconButton onClick={() => router.back()}>
          <NavigateBeforeIcon className="navigation-icon" />
        </IconButton>

        <span>{currentPage?.label}</span>
      </div>
    </div>
  );
}
