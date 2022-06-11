import { createTheme } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: deepPurple,
    background: {
      default: '#dee2ff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
