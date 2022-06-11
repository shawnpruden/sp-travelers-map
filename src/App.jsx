import React, { useEffect, useState } from 'react';

import { CssBaseline, Grid, ThemeProvider } from '@mui/material';

import { getPlaceData, getWeatherData } from './apis';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { theme } from './styles';

function App() {
  const [weather, setWeather] = useState({});
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  const [childClicked, setChildClicked] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoords({ lat: latitude, lng: longitude }),
      (err) => {
        setCoords({ lat: 49.246292, lng: -123.116226 });
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (Object.keys(bounds).length) {
      const identifier = setTimeout(() => {
        console.log('data is coming');
        setFilteredPlaces([]);

        getPlaceData(type, bounds.ne, bounds.sw).then((data) => {
          data &&
            setPlaces(
              data.filter((place) => place.name && place.rating && place.photo)
            );

          setRating(0);
        });
      }, 1000);

      return () => clearTimeout(identifier);
    }
  }, [type, bounds]);

  useEffect(() => {
    setFilteredPlaces(places.filter((place) => Number(place.rating) >= rating));
  }, [places, rating]);

  useEffect(() => {
    if (Object.keys(coords).length) {
      const identifier = setTimeout(() => {
        setWeather({});

        getWeatherData(coords.lat, coords.lng).then(
          (data) => data && setWeather(data)
        );
      }, 1000);

      return () => clearTimeout(identifier);
    }
  }, [coords]);

  console.log(
    '%cLogged',
    'color: #ffcb6b; margin: 0.2rem',
    '\n',
    places,
    type,
    rating,
    coords
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid
        container
        spacing={3}
        sx={{
          width: {
            xs: 'auto',
            sm: '100%',
          },
        }}
      >
        <Grid item xs={12} md={4}>
          <List
            weather={weather}
            places={filteredPlaces}
            type={type}
            rating={rating}
            setType={setType}
            setRating={setRating}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            setChildClicked={setChildClicked}
            places={filteredPlaces}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
