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
  setType,
  rating,
  setRating,
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
                  {weather.city.name}
                </Typography>
                <Typography variant="h3">
                  {Math.round(weather.list[0].temp.day)}&deg;
                </Typography>
              </Box>
              <Box sx={{ ...flexColumn, alignItems: 'flex-end' }}>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}.png`}
                  alt={weather.list[0].weather[0].description}
                  style={image}
                />
                <Typography variant="subtitle2">
                  {weather.list[0].weather[0].main} ({weather.list[0].humidity}
                  %)
                </Typography>

                <Typography variant="subtitle2">
                  H:{Math.round(weather.list[0].temp.max)}&deg; L:
                  {Math.round(weather.list[0].temp.min)}&deg;
                </Typography>
              </Box>
            </Grid>

            {weather.list.slice(1).map((data, index) => (
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
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} variant="standard">
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e) => setRating(e.target.value)}>
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
