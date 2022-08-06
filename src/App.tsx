import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import SignIn from './pages/SignIn';
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import Alert from './components/Alert';
import theme from './assets/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
