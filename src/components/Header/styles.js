import { alpha } from '@mui/material';

export const title = {
  display: { xs: 'none', sm: 'block' },

  alignSelf: 'center',

  textShadow: '0 0 5px #fff',
};

export const toolbar = {
  display: 'flex',
  justifyContent: 'space-between',

  opacity: 0.9,
};

export const search = {
  position: 'relative',

  width: {
    xs: '100%',
    sm: 'auto',
  },
  mr: 2,
  ml: {
    xs: 0,
    sm: 3,
  },

  borderRadius: 1,
  boxShadow: '0 0 5px #fff',

  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),

  transition: '0.5s',
  '&:hover': {
    backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
  },
};

export const searchIcon = {
  position: 'absolute',

  height: '100%',
  px: 2,
  py: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const input = {
  width: {
    xs: '100%',
    md: '15rem',
  },
  py: 0.5,
  pr: 0.5,
  pl: (theme) => `calc(1rem + ${theme.spacing(4)})`,

  color: 'inherit',

  transition: (theme) => theme.transitions.create('width'),
};
