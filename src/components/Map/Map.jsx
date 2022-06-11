import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';

import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Marker from './Marker';

import { mapContainer, markerContainer } from './styles';
import { loader } from '../List/styles';

function Map({ setCoords, setBounds, coords, places, setChildClicked }) {
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleChange = (e) => {
    const fix = (longitude) => (((longitude % 360) + 540) % 360) - 180;

    const ne = { lat: e.marginBounds.ne.lat, lng: fix(e.marginBounds.ne.lng) };
    const sw = { lat: e.marginBounds.sw.lat, lng: fix(e.marginBounds.sw.lng) };

    setCoords({ lat: e.center.lat, lng: fix(e.center.lng) });
    setBounds({ ne: ne, sw: sw });
  };

  return (
    <Box component="div" sx={mapContainer}>
      {Object.keys(coords).length ? (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          center={coords}
          defaultZoom={12}
          margin={[50, 50, 50, 50]}
          options={{
            zoomControl: true,
            gestureHandling: 'cooperative',
            disableDefaultUI: true,
          }}
          onDrag={() => setIsVisible(false)}
          onDragEnd={() => setIsVisible(true)}
          onChange={handleChange}
          onChildClick={(child) => setChildClicked(child)}
        >
          {places?.map((place, index) => (
            <Box
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={index}
              sx={markerContainer}
              style={isVisible ? {} : { opacity: 0 }}
            >
              {isMobile ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Marker place={place} />
              )}
            </Box>
          ))}
        </GoogleMapReact>
      ) : (
        <Box sx={{ ...loader, height: '100%' }}>
          <CircularProgress size={100} sx={{ color: '#fff' }} />
        </Box>
      )}
    </Box>
  );
}

export default Map;
