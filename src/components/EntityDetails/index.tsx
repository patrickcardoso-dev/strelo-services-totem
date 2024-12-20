import Image from 'next/image';

import './styles.css';

interface EntityDetailsProps {
  entityDetails: {
    address: string;
    id: string;
    name: string;
    slug: string;
    logo: string;
    coverImage: string | null;
    segment: string;
    serviceCategories: string[];
    openingHours: string;
    phone: string;
    mapLink: string | null;
  };
}

export default function EntityDetails({ entityDetails }: EntityDetailsProps) {
  return (
    <div className="details-area">
      {entityDetails.coverImage && (
        <div className="cover-image container">
          <Image
            src={entityDetails.coverImage}
            alt={entityDetails.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="details-main-info">
        <Image src={entityDetails.logo} alt={entityDetails.name} width={80} height={80} />
        <div>
          <h2>{entityDetails.name}</h2>
          <p>{entityDetails.serviceCategories.join(', ')}</p>
        </div>
      </div>

      <div className="details-operation-info">
        <span>Horário de funcionamento</span>
        <p>{entityDetails.openingHours}</p>
        <span>Contatos</span>
        <p>{entityDetails.phone}</p>
        <span>Localização</span>
        <p>{entityDetails.address}</p>
      </div>

      <div className="iframe-area">
        <iframe
          src={`https://salvador-airport-preview.blumaps.com.br/?${entityDetails.mapLink}`}
          title="Localização do estabelecimento no mapa do aeroporto"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
