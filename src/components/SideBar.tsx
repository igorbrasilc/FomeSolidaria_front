import * as React from 'react';
import {
  ListItemText, ListItemIcon, ListItemButton, ListItem, Divider, List, Button, Drawer, Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

export default function SideBar(
  { openSideBar, setOpenSideBar }: {openSideBar: boolean, setOpenSideBar: any},
) {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenSideBar(open);
  };

  const recognizeIcon = (text: string) => {
    switch (text) {
      case 'Configurações':
        return <SettingsIcon />;
      case 'Sobre':
        return <InfoIcon />;
      default:
        return <SettingsIcon />;
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Configurações', 'Sobre'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {recognizeIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={openSideBar}
      onClose={toggleDrawer(false)}
    >
      {list()}
    </Drawer>
  );
}
