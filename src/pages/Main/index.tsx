import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import StatisticsCard from '../../components/StatisticsCard';

import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';

export default function Main() {
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const { token, decodeToken } = useAuth();

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  const decodedToken = decodeToken(token);

  return (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {`OLÁ ${decodedToken?.name.toUpperCase()}!`}
        </Typography>
        <StatisticsCard />
      </Box>
    </Box>
  );
}
