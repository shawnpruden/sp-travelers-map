import React, { useState } from 'react';

import { Box, CardContent, CardMedia, Typography } from '@mui/material';

import { card, marker } from './styles';

function Marker({ place }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box>
      <CardMedia
        component="img"
        image={place.photo.images.medium.url}
        alt={place.description}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        sx={marker}
      />
      <CardContent
        sx={card}
        style={isVisible ? { opacity: 1, visibility: 'visible' } : {}}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Typography variant="h6" gutterBottom sx={{ lineHeight: 1.2 }}>
          {place.name}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          {place.ranking}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {place.description}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default Marker;
