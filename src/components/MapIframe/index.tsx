'use client';

import { useSearchParams } from 'next/navigation';

import './styles.css';

export default function MapIframe() {
  const searchParams = useSearchParams();

  const getIframeUrl = () => {
    const stringParam = searchParams.toString();
    const validGateLocation = stringParam.startsWith('location=');

    if (!validGateLocation) {
      return 'https://salvador-airport-preview.blumaps.com.br/';
    }

    return `https://salvador-airport-preview.blumaps.com.br/?${stringParam}`;
  };

  return (
    <div className="container iframe-area">
      <iframe
        src={getIframeUrl()}
        title="Mapa do aeroporto"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
}
