export const container = {
  p: 3,
};

export const today = {
  padding: '1rem 1rem 0',
  display: 'flex',
  justifyContent: 'space-between',
};

export const weatherList = {
  height: '25vh',
  px: 4,
  pb: 1,

  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  opacity: 0.8,
  color: '#fff',

  bgcolor: '#673ab7',
  boxShadow: '0 0 10px #673ab7',
};

export const formControl = {
  height: '10vh',

  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

export const placesList = {
  height: '50vh',

  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  opacity: 0.9,
  bgcolor: '#7e57c2',
  boxShadow: '0 0 10px #7e57c2',
};

export const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
};

export const image = {
  display: 'block',
  width: '25px',
  height: '25px',
};

export const loader = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
