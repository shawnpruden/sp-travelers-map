import React, { createRef, useEffect, useState } from 'react';

import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import WeatherDetails from '../WeatherDetails/WeatherDetails';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import {
  container,
  flexColumn,
  formControl,
  loader,
  placesList,
  weatherList,
  image,
  today,
} from './styles';

function List({
  weather,
  places,
  childClicked,
  type,
  rating,
  handleSetType,
  handleSetRating,
}) {
  const [placeRefs, setPlaceRefs] = useState([]);

  useEffect(() => {
    setPlaceRefs((prevRefs) =>
      Array(places?.length)
        .fill()
        .map((_, index) => prevRefs[index] || createRef())
    );
  }, [places?.length]);

  return (
    <Box sx={container} component="div">
      <Grid container sx={weatherList}>
        {Object.keys(weather).length ? (
          <>
            <Grid item xs={12} style={today}>
              <Box sx={flexColumn}>
                <Typography variant="subtitle2" fontSize="1rem">
                  {weather.city_name}
                </Typography>
                <Typography variant="h3">
                  {Math.round(weather.data[0].temp)}&deg;
                </Typography>
              </Box>
              <Box
                sx={{
                  ...flexColumn,
                  alignItems: 'flex-end',
                  justifyContent: 'space-evenly',
                }}
              >
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`}
                  alt={weather.data[0].weather.description}
                  style={image}
                />
                <Typography variant="subtitle2">
                  {weather.data[0].weather.description} ({weather.data[0].rh}
                  %)
                </Typography>

                <Typography variant="subtitle2">
                  H:{Math.round(weather.data[0].max_temp)}&deg; L:
                  {Math.round(weather.data[0].min_temp)}&deg;
                </Typography>
              </Box>
            </Grid>

            {weather.data.slice(1, 8).map((data, index) => (
              <Grid item xs={12} key={index} style={{ padding: '0.5rem 1rem' }}>
                <WeatherDetails data={data} />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item xs={12} sx={loader}>
            <CircularProgress size={50} sx={{ color: '#fff' }} />
          </Grid>
        )}
      </Grid>

      <Box sx={formControl}>
        <FormControl sx={{ minWidth: 120 }} variant="standard">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={handleSetType}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} variant="standard">
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={handleSetRating}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3 stars</MenuItem>
            <MenuItem value={4}>Above 4 stars</MenuItem>
            <MenuItem value={4.5}>Above 4.5 stars</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container sx={placesList}>
        {places.length ? (
          <>
            {places.map((place, index) => (
              <Grid
                item
                xs={12}
                key={index}
                ref={placeRefs[index]}
                style={{ padding: '1rem' }}
              >
                <PlaceDetails
                  place={place}
                  isSelected={Number(childClicked) === index}
                  refProp={placeRefs[index]}
                />
              </Grid>
            ))}
          </>
        ) : (
          <Grid item xs={12} sx={loader}>
            <CircularProgress size={50} sx={{ color: '#fff' }} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default List;
