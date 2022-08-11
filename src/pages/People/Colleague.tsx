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
import { PersonalDataAccordion, AddressDataAccordion } from './utils/listUtils';
import api from '../../services/api';

export default function ColleagueScreen() {
  const { id } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [colleagueInfos, setColleagueInfos] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  React.useEffect(() => {
    const promise: Promise<AxiosResponse<any, any>> = api.getColleague(Number(id), token);
    promise.then((response) => {
      setColleagueInfos(response.data.colleagueInfos);
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
          {`${colleagueInfos.name}`}
        </Typography>
        <PersonalDataAccordion infos={colleagueInfos} />
        <AddressDataAccordion address={colleagueInfos.donee.address} />
        <Button sx={styles.nameButton} variant="outlined" onClick={() => navigate(`/donee/${colleagueInfos.doneeId}`)}>
          Registrado como colega de
          {' '}
          {colleagueInfos.donee.name.toUpperCase()}
        </Button>
        <Typography variant="text" component="h6">
          Registrado em
          {' '}
          {dayjs(colleagueInfos.created_at).format('DD/MM/YY HH:mm')}
        </Typography>
      </Box>
    </Box>
  );
};
