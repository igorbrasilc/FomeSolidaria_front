import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EEC02E',
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
    },
    background: { default: '#cac6c6', paper: '#FFF' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f3f3f3',
          //   backgroundImage: 'linear-gradient(180deg, rgba(255,167,81,1) 31%, rgba(255,226,89,1) 78%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: orange[700],
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: orange[700],
        },
      },
    },
  },
});

export default theme;
