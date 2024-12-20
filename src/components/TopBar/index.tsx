import Image from 'next/image';

import './styles.css';

export default function TopBar() {
  return (
    <header className="header-area">
      <div className="container flex">
        <Image src="/images/airport-logo.jpg" alt="" width="160" height="44" priority />

        <Image src="/images/operator-logo.jpg" alt="" width="44" height="44" priority />
      </div>
    </header>
  );
}
