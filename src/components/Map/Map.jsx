import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';

import { Box, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Marker from './Marker';

import { mapContainer, markerContainer } from './styles';

function Map({ coords, places, handleMapChange, handleChildClicked }) {
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box component="div" sx={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        }}
        center={
          Object.keys(coords).length
            ? coords
            : { lat: 49.246292, lng: -123.116226 }
        }
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={{
          zoomControl: true,
          gestureHandling: 'cooperative',
          disableDefaultUI: true,
        }}
        onDrag={() => setIsVisible(false)}
        onDragEnd={() => setIsVisible(true)}
        onChange={handleMapChange}
        onChildClick={handleChildClicked}
      >
        {places?.map((place, index) => (
          <Box
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
            sx={markerContainer}
            style={{ opacity: isVisible && 1 }}
          >
            {isMobile ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Marker place={place} />
            )}
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  );
}

export default Map;
