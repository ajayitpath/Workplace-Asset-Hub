import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(89, 116, 252)',
      dark: 'rgb(77, 104, 255)',
    },
    secondary: {
      main: 'rgb(151, 98, 98)',
    },
    background: {
      default: '#F4F4F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgb(0, 0, 0)',
      secondary: 'rgb(107, 114, 128)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
// This theme can be used in your MUI components by wrapping your application with ThemeProvider
// from '@mui/material/styles' and passing the theme as a prop.