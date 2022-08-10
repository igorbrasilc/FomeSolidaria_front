import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import { SpouseScreen, DoneeScreen, ColleagueScreen } from './pages/People';
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
              <Route exact path="/" element={<SignIn />} />
              <Route exact path="/main" element={<Main />} />
              <Route exact path="/spouse/:id" element={<SpouseScreen />} />
              <Route exact path="/donee/:id" element={<DoneeScreen />} />
              <Route exact path="/colleague/:id" element={<ColleagueScreen />} />
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
