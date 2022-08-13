import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import HistoryScreen from './pages/History';
import DoneeForm from './pages/DoneeForm';
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
              <Route exact path="/" element={<SignIn />} />
              <Route exact path="/main" element={<Main />} />
              <Route exact path="/new-donee" element={<DoneeForm />} />
              <Route exact path="/spouse/:id" element={<SpouseScreen />} />
              <Route exact path="/donee/:id" element={<DoneeScreen />} />
              <Route exact path="/donee/:id/history" element={<HistoryScreen />} />
              {/* <Route exact path="/donee/:id/new-donation" element={<DoneeScreen />} /> */}
              <Route exact path="/donee/:id/notes" element={<NotesScreen />} />
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
