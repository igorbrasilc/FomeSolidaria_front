import * as React from 'react';
import {
  ListItemText, ListItemIcon, ListItemButton, ListItem, Divider, List, Button, Drawer, Box, Link,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';

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
      case 'Desenvolvedor':
        return <CodeIcon />;
      default:
        return <SettingsIcon />;
    }
  };

  const recognizeLink = (text: string) => {
    switch (text) {
      case 'Configurações':
        return '#';
      case 'Sobre':
        return 'https://igrejacasadooleiro.com.br/fome-solidaria';
      case 'Desenvolvedor':
        return 'https://github.com/igorbrasilc';
      default:
        return 'https://github.com/igorbrasilc';
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
        {['Configurações', 'Sobre', 'Desenvolvedor'].map((text) => (
          <Link href={recognizeLink(text)} underline="none">
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {recognizeIcon(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
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
