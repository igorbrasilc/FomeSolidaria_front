import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import HistoryScreen from './pages/History';
import DoneeForm from './pages/DoneeForm';
import DonationForm from './pages/DonationForm';
import NotesScreen from './pages/Notes';
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
              <Route path="/" element={<SignIn />} />
              <Route path="/main" element={<Main />} />
              <Route path="/new-donee" element={<DoneeForm />} />
              <Route path="/spouse/:id" element={<SpouseScreen />} />
              <Route path="/donee/:id" element={<DoneeScreen />} />
              <Route path="/donee/:id/history" element={<HistoryScreen />} />
              <Route path="/donee/:id/new-donation" element={<DonationForm />} />
              <Route path="/donee/:id/notes" element={<NotesScreen />} />
              <Route path="/colleague/:id" element={<ColleagueScreen />} />
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
