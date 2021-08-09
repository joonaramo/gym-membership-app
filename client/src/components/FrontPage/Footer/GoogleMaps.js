import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMaps = ({ settings }) => {
  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  const center = {
    lat: settings.maps.lat,
    lng: settings.maps.lng,
  };
  return (
    <LoadScript googleMapsApiKey={settings.maps.api_key}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11.6}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
