import { createTheme } from '@mui/material/styles';
import { yellow, orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
    },
    background: { default: '#ebebeb', paper: '#FFF' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFF',
          backgroundImage: 'linear-gradient(180deg, rgba(228,226,15,0.7567226719789478) 34%, rgba(255,255,255,0.8463585263206845) 87%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

export default theme;
