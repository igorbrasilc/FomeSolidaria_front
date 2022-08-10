import React from 'react';
import { useParams } from 'react-router';
import { Typography, Box, Button } from '@mui/material';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { PersonalDataAccordion, AddressDataAccordion } from './utils/listUtils';
import styles from './styles';

export default function ColleagueScreen() {
  const { id } = useParams();
  const [openSideBar, setOpenSideBar] = React.useState(false);

  return (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          FULANO!
        </Typography>
        <Typography variant="h6" component="h1" sx={styles.title}>
          Registrado como colega de outro fulano
        </Typography>
        <PersonalDataAccordion />
        <AddressDataAccordion />
        <Button variant="contained" sx={styles.button}>HISTÓRICO</Button>
      </Box>
    </Box>
  );
};
