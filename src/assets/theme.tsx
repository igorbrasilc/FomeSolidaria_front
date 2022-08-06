import { createTheme } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
      contrastText: '#fff',
    },
    secondary: {
      main: '#001',
    },
    background: { default: '#d3d1d1', paper: '#949494' },
  },
});

export default theme;
