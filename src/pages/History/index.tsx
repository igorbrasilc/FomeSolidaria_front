import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  Typography, Box, Button, Pagination,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import api from '../../services/api';
import HistoryAccordion from './utils/Accordions';
import { DonationInfos } from '../People/types';

const MAX_HISTORY_ITEMS = 5;

export interface DoneeHistory {
    doneeName: string,
    doneeId: number,
    donations: DonationInfos[]
}

export default function HistoryScreen() {
  const { id } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const doneeInfos = location.state as DoneeHistory;

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  return (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {`Histórico de ${doneeInfos.doneeName}`}
        </Typography>
        <Button sx={styles.button} variant="outlined" onClick={() => navigate(`/donee/${doneeInfos.doneeId}`)}>
          Voltar
        </Button>
        <HistoryAccordion 
          page={page}
          donations={doneeInfos.donations}
          maxItems={MAX_HISTORY_ITEMS}
        />
        <Pagination
          count={Math.ceil(doneeInfos.donations.length / MAX_HISTORY_ITEMS)}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={styles.pagination}
        />
      </Box>
    </Box>
  );
};
