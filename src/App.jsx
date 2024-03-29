import React, { useEffect, useState } from 'react';

import { CssBaseline, Grid, ThemeProvider } from '@mui/material';

import { getPlaceData, getWeatherData } from './apis';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { theme } from './styles';

const fix = (lng) => (((lng % 360) + 540) % 360) - 180;

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

  const handleMapChange = (e) => {
    if (!Object.keys(coords).length) return;

    const ne = { lat: e.marginBounds.ne.lat, lng: fix(e.marginBounds.ne.lng) };
    const sw = { lat: e.marginBounds.sw.lat, lng: fix(e.marginBounds.sw.lng) };

    setCoords({ lat: e.center.lat, lng: fix(e.center.lng) });
    setBounds({ ne: ne, sw: sw });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleSetCoords={(coords) => setCoords(coords)} />
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
            childClicked={childClicked}
            type={type}
            rating={rating}
            handleSetType={(e) => setType(e.target.value)}
            handleSetRating={(e) => setRating(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coords={coords}
            places={filteredPlaces}
            handleMapChange={handleMapChange}
            handleChildClicked={(child) => setChildClicked(child)}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
