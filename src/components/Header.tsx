import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAlert from '../hooks/useAlert';

export default function Header({ setOpenSideBar }: any) {
  const { signOut } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();

  async function handleLogout() {
    signOut();
    navigate('/');
    setMessage({ type: 'success', text: 'Logout concluído!' });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenSideBar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Opções
          </Typography>
          <Button color="inherit" onClick={() => handleLogout()}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
