import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // main:'rgb(85, 108, 214)' ,  // Replace with color from Figma
      main: '#556CD6',
    },
    secondary: {
      main:'#19857B' ,  // Replace with color from Figma
    },
    background: {
      default:'#697581' ,  // Replace with color from Figma
    },
    text: {
      primary:'#754949' ,
      secondary:'#A16C6C' ,  // Replace with color from Figma
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
// This theme can be used in your MUI components by wrapping your application with ThemeProvider
// from '@mui/material/styles' and passing the theme as a prop.