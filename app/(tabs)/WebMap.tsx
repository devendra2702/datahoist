import React from 'react';
import { Platform, View, Text } from 'react-native';

export default function WebMap() {
  if (Platform.OS !== 'web') {
    return (
      <View>
        <Text>Map is only available on web.</Text>
      </View>
    );
  }

  // Import leaflet & react-leaflet dynamically at runtime on web
  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } = require('react-leaflet');
  require('leaflet/dist/leaflet.css');

  const fabLabs = [
    {
      name: "FabLab1",
      url: "http://www.fablab1.fr",
      logo: "http://fabacademy.org/archives/2015/eu/students/luis.belmiro/images/fablab_logo.png",
      coords: { lat: 43.1364649, lng: 5.8633914 }
    }
  ];

  const MapComponent = () => (
    <MapContainer
      center={[43.449, 5.860]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {fabLabs.map((lab, idx) => (
        <Marker key={idx} position={[lab.coords.lat, lab.coords.lng]}>
          <Popup>
            <a href={lab.url} target="_blank" rel="noopener noreferrer">
              <img src={lab.logo} alt={lab.name} width={50} /><br />
              {lab.name}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  return <MapComponent />;
}
