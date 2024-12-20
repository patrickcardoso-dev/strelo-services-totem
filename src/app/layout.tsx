import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';

import TopBar from 'src/components/TopBar';
import BottomBar from 'src/components/BottomBar';
import CheckUserActivityModal from 'src/components/CheckUserActivityModal';

import './globals.css';

const publicSans = Public_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Seu Aeroporto',
  description: 'Seu sistema unificado de serviços',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={publicSans.className}>
        <CheckUserActivityModal />
        <TopBar />
        {children}
        <BottomBar />
      </body>
    </html>
  );
}
