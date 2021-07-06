import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 60.94948951212578,
  lng: 23.44012102029137,
};

const GoogleMaps = () => {
  return (
    <LoadScript googleMapsApiKey='AIzaSyBpTbD1V8P-KVaM62r5Lo5IozvFdniahLw'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11.6}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
