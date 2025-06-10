import { createTheme } from '@mui/material/styles';

// Simple expressive Material 3 theme with custom accent color
const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4',
    },
    secondary: {
      main: '#486284',
    },
  },
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
  },
});

export default theme;
