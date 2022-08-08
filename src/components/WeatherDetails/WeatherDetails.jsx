import React from 'react';

import { Box, Card, Typography } from '@mui/material';

import { card, content, image } from './styles';

function WeatherDetails({ data }) {
  const day = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date(data.valid_date));

  return (
    <Card elevation={0} sx={card}>
      <Box sx={content}>
        <Typography variant="subtitle2">{day}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`}
            alt={data.weather.description}
            style={image}
          />
          <Typography variant="caption">({data.rh}%)</Typography>
        </Box>

        <Typography variant="subtitle2">
          {Math.round(data.min_temp)}&deg; — {Math.round(data.max_temp)}&deg;
        </Typography>
      </Box>
    </Card>
  );
}

export default WeatherDetails;
