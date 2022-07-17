import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
export let theme = createTheme({
  typography: {
    fontFamily: 'Heebo, sans-serif',
  },
  palette: {
    primary: {
      main: '#243a76',
    },
    secondary: {
      main: '#ed1b24',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#21243D',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
      styleOverrides: {
        maxWidthXl: {
          '@media (min-width: 1650px)': {
            maxWidth: '1650px',
          },
          '@media (max-width: 1649px)': {
            maxWidth: '1200px',
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: 'black',
          textDecoration: 'none',

          '&:hover, &.active': {
            color: '#FF6464',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
