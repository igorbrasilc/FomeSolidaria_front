import * as React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Tooltip,
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
          <Tooltip title="Opções" placement="right-end">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenSideBar(true)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Opções
          </Typography>
          <Button color="inherit" onClick={() => handleLogout()}>Sair</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
