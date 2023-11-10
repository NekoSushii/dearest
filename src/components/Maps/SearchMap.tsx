import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const MapContainer: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState('');

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    map?.panTo(latLng);
    map?.setZoom(15);
  };

  return (
    <LoadScript googleMapsApiKey={'AIzaSyBVYfFNABDUezksK4S-2ceg8APDpbVIT8o'} libraries={['places']}>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search for places...' })} />
            <div>
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: 1.3521, lng: 103.8198 }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
