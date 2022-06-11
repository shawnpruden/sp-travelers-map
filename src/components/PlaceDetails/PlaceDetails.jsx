import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from '@mui/material';

import PhoneIcon from '@mui/icons-material/Phone';

import { chip, info } from './styles';

function PlaceDetails({ place, isSelected, refProp }) {
  isSelected && refProp?.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Card elevation={0} sx={{ boxShadow: '0 0 10px #fff' }}>
      <CardMedia
        component="img"
        image={place.photo.images.medium.url}
        alt={place.name}
        height="250"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {place.name}
        </Typography>

        <Box sx={info}>
          <Typography variant="subtitle2" color="text.secondary">
            {place.rating}
          </Typography>
          <Rating
            value={Number(place.rating)}
            precision={0.5}
            size="small"
            sx={{ mx: 0.5 }}
            readOnly
          />
          <Typography variant="subtitle2" color="text.secondary">
            {`(${place.num_reviews} reviews)`}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mx: 0.5 }}
          >
            {place.price_level ? ' | ' : ''}
            {place.price_level}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {place.address && <span>{place.address}</span>}

          {place.phone ? ' | ' : ''}
          {place.phone && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'bottom',
              }}
            >
              <PhoneIcon sx={{ fontSize: 'inherit', mr: 0.5 }} />
              {place.phone}
            </Box>
          )}
        </Typography>

        {place.awards.length !== 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <img src={place.awards[0].images.small} alt={place.name} />
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              {place.awards[0].display_name}
            </Typography>
          </Box>
        )}

        {place.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} sx={chip} />
        ))}

        <Box>
          <Button
            size="large"
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </Button>
          <Button
            size="large"
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Tripadvisor
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;
