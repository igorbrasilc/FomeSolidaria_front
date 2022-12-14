import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Typography, Box, Button } from '@mui/material';
import { AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import {
  PersonalDataAccordion, AddressDataAccordion, ChildDataAccordion, ColleaguesDataAccordion, SpouseDataAccordion,
} from './utils/listUtils';
import api from '../../services/api';

export default function DoneeScreen() {
  const { id } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [doneeInfos, setDoneeInfos] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);

  const historyInfo = {
    doneeName: doneeInfos.name,
    doneeId: doneeInfos.id,
    donations: doneeInfos.donations,
  };

  const notesInfo = {
    doneeName: doneeInfos.name,
    doneeId: doneeInfos.id,
    notes: doneeInfos.notes,
  };

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  React.useEffect(() => {
    const promise: Promise<AxiosResponse<any, any>> = api.getDonee(Number(id), token);
    promise.then((response) => {
      setDoneeInfos(response.data.doneeInfos);
      setLoading(false);
    })
      .catch((err) => {
        setMessage({ type: 'error', text: err.message });
        navigate('/main');
      });
  }, []);

  return loading ? (
    <Box id="container" sx={styles.container.onLoading}>
      <CircularProgress size={60} />
    </Box>
  ) : (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {`${doneeInfos.name}`}
        </Typography>
        <PersonalDataAccordion infos={doneeInfos} />
        <AddressDataAccordion address={doneeInfos.address} />
        <SpouseDataAccordion infos={doneeInfos.spouse} />
        <ChildDataAccordion infos={doneeInfos.children} />
        <ColleaguesDataAccordion infos={doneeInfos.colleagues} />
        <Button sx={styles.button} variant="contained" onClick={() => navigate(`/donee/${doneeInfos.id}/history`, { state: historyInfo })}>
          Histórico
        </Button>
        <Button sx={styles.button} variant="contained" onClick={() => navigate(`/donee/${doneeInfos.id}/new-donation`)}>
          Nova doação
        </Button>
        <Button sx={styles.button} variant="contained" onClick={() => navigate(`/donee/${doneeInfos.id}/notes`, { state: notesInfo })}>
          Anotações
        </Button>
        <Typography component="h6">
          Registrado em
          {' '}
          {dayjs(doneeInfos.created_at).format('DD/MM/YY HH:mm')}
        </Typography>
      </Box>
    </Box>
  );
};
