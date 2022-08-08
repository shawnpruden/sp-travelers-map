import axios from 'axios';

export const getPlaceData = async (type, ne, sw) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_latitude: ne.lat,
          tr_longitude: ne.lng,

          currency: 'CAD',
          lang: 'en_CA',
        },

        headers: {
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      {
        params: {
          lat: lat,
          lon: lng,

          units: 'metric',
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
