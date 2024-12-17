import Link from 'next/link';
import Image from 'next/image';

import './styles.css';

interface HomeMenuProps {
  menuItems: {
    ref: string;
    id: string;
    label: string;
    icon: string;
    backgroundColor: string;
    textColor: string;
  }[];
}

export default function HomeMenu({ menuItems }: HomeMenuProps) {
  return (
    <div className="grid-menu">
      {menuItems.map((item) => (
        <div key={item.id} className="grid-item">
          <Link href={item.ref} passHref>
            <div
              className="item-area"
              style={{ color: item.textColor, background: item.backgroundColor }}
            >
              <Image src={item.icon} alt={item.label} width={40} height={40} />
              <span>{item.label}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
