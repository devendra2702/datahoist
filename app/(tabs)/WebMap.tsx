import React, { useEffect, useState } from 'react';
import { Platform, View, Text } from 'react-native';

type Location = {
  title: string;
  subtitle: string;
  url: string;
  logo: string;
  coords: { lat: number; lng: number };
};

export default function WebMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsMounted(true);
    }
  }, []);

  if (Platform.OS !== 'web') {
    return (
      <View>
        <Text>Map is only available on web.</Text>
      </View>
    );
  }

  if (!isMounted) return null;

  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
  } = require('react-leaflet');
  const L = require('leaflet');
  require('leaflet/dist/leaflet.css');

  // ✅ Fix missing default icon issue
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  const location = [
    {
      title: 'Dallas Fort Worth International Airport',
      subtitle: 'DFW Airport',
      url: '/about',
      logo: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753378572/Frame_427321863_mcpz4a.png',
      coords: { lat: 32.8998, lng: -97.0403 },
    },
    {
      title: 'AT&T Stadium',
      subtitle: 'Metroplex Elevator Systems',
      url: '/about',
      logo: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753378571/Frame_26_dt9ond.png',
      coords: { lat: 32.7473, lng: -97.0945 },
    },
    {
      title: 'Frost Bank Tower',
      subtitle: 'Alamo City Elevators',
      url: '/about',
      logo: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753466106/Frame_30_r8makm.png',
      coords: { lat: 30.2652, lng: -97.7431 },
    },
    {
      title: 'Texas Medical Center',
      subtitle: 'Medical Lift Systems',
      url: '/about',
      logo: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753466106/Frame_26_ilknux.png',
      coords: { lat: 29.7058, lng: -95.4010 },
    },
    {
      title: 'Toyota Center',
      subtitle: 'Houston, TX',
      url: '/about',
      logo: 'https://res.cloudinary.com/djys5iq4v/image/upload/v1753466106/Frame_29_ayjd8k.png',
      coords: { lat: 29.7508, lng: -95.3621 },
    },
  ];
  
  // ✅ Generate custom HTML icon
  const createHtmlIcon = (loc: Location) =>
    L.divIcon({
      className: '',
      html: `
        <div style="
          display: flex;
          align-items: center;
          background: white;
          border-radius: 12px;
          padding: 10px 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          width: fit-content;
        ">
          <img src="${loc.logo}" alt="${loc.title}" style="
            width: 48px;
            height: 48px;
            border-radius: 12px;
            object-fit: cover;
            margin-right: 10px;
          " />
          <div style="overflow: hidden;">
            <div style="
              font-weight: 600;
              font-size: 14px;
              line-height: 1.2;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 140px;
            ">${loc.title}</div>
            <div style="font-size: 12px; color: #666;">${loc.subtitle}</div>
          </div>
        </div>
      `,
      iconAnchor: [110, 25], // Adjust horizontal position
      popupAnchor: [0, -30],
    });

  const MapReadyHelper = () => {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, [map]);
    return null;
  };

  const MapComponent = () => (
    <MapContainer
      center={[30.9117, -96.9547]}
      zoom={7}
      style={{ height: '100vh', width: '100%' }}
    >
      <MapReadyHelper />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {location.map((loc, idx) => (
        <Marker
          key={idx}
          position={[loc.coords.lat, loc.coords.lng]}
          icon={createHtmlIcon(loc)}
        >
          <Popup>
            <a href={loc.url} target="_blank" rel="noopener noreferrer">
              <img src={loc.logo} alt={loc.title} width={50} /><br />
              {loc.title}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  return <MapComponent />;
}
