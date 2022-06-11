import React from 'react';

import { Box, Card, Typography } from '@mui/material';
import { card, content } from './styles';

function WeatherDetails({ data }) {
  const day = new Date(data.dt * 1000).toLocaleString('en-us', {
    weekday: 'short',
  });

  console.log('%cday!!!', 'color: #ffcb6b; margin: 0.2rem', '\n', day);
  return (
    <Card elevation={0} sx={card}>
      <Box sx={content}>
        <Typography variant="subtitle2">{day}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
          />
          <Typography variant="caption">({data.humidity}%)</Typography>
        </Box>

        <Typography variant="subtitle2">
          {Math.round(data.temp.min)}&deg; — {Math.round(data.temp.max)}&deg;
        </Typography>
      </Box>
    </Card>
  );
}

export default WeatherDetails;
