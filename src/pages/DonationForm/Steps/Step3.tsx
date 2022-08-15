import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useAlert from '../../../hooks/useAlert';
import useAuth from '../../../hooks/useAuth';
import styles from '../styles';
import { DonationFormData } from '..';
import api from '../../../services/api';

interface Props {
    formInfos: DonationFormData,
    step: number,
    setStep: any
}

export default function Step3(props: Props) {
  const {
    formInfos, step, setStep,
  } = props;
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const { token } = useAuth();

  React.useEffect(() => {
    const promise = api.postDonation(formInfos, token, Number(id));
    promise.then((res) => {
      setLoading(false);
      setSuccess(true);
      setMessage({ type: 'success', text: 'Doação registrada!' });
    })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setMessage({ type: 'error', text: err.message || 'Doação não registrada, erro interno' });
      });
  }, []);

  return (
    <Box
      component="form"
      sx={styles.formBox}
      noValidate
    >
      <Typography sx={styles.title} variant="h4">
        Confirmação
      </Typography>
      {loading ? <CircularProgress size={60} />
        : (
          <>
            <Typography variant="h5" color={success ? 'success' : 'error'}>{success ? 'Doação criada!' : 'Houve algum erro na requisição, tente novamente mais tarde'}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button sx={styles.button} variant="contained" onClick={() => setStep(step - 1)}>Voltar</Button>
              {success
                ? <Button sx={styles.button} variant="contained" onClick={() => navigate(`/donee/${id}`)}>Ir para a página do usuário</Button>
                : <Button sx={styles.button} variant="contained" onClick={() => setLoading(!loading)}>Tentar novamente</Button>}
            </Box>
          </>
        )}
    </Box>
  );
}
