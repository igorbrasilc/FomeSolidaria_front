import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[700],
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
          backgroundColor: '#001',
          backgroundImage: 'linear-gradient(180deg, rgba(228,226,15,0.7567226719789478) 34%, rgba(255,255,255,0.8463585263206845) 87%)',
          backgroundAttachment: 'fixed',
        }
      },
    },
    MuiAvatar: {
        styleOverrides: {
            root: {
                backgroundColor: orange[700]
            }
        }
    }
  },
});

export default theme;
