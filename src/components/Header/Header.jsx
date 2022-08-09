import React, { useState } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { title, toolbar, search, searchIcon, input } from './styles';

function Header({ handleSetCoords }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    handleSetCoords({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar sx={toolbar}>
        <Typography variant="h5" sx={title}>
          Traveler's Map
        </Typography>
        <Box display="flex">
          <Typography variant="h6" sx={title}>
            Where to explore
          </Typography>
          <Autocomplete
            onLoad={(input) => setAutocomplete(input)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Box component="div" sx={search}>
              <Box component="div" sx={searchIcon}>
                <SearchIcon />
              </Box>
              <InputBase placeholder="Search..." sx={input} />
            </Box>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
