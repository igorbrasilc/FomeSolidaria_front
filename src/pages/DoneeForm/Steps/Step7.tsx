import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import useAlert from '../../../hooks/useAlert';
import useAuth from '../../../hooks/useAuth';
import styles from '../styles';
import { DoneeFormData } from '..';
import api from '../../../services/api';

interface Props {
    formInfos: DoneeFormData,
    step: number,
    setStep: any
}

export default function Step7(props: Props) {
  const {
    formInfos, step, setStep,
  } = props;
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [id, setId] = React.useState(null);
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const { token } = useAuth();

  React.useEffect(() => {
    const promise = api.postDonee(formInfos, token);
    promise.then((res) => {
      setLoading(false);
      setId(res.data.id);
      setSuccess(true);
      setMessage({ type: 'success', text: 'Donatário criado!' });
    })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setMessage({ type: 'error', text: err.message || 'Donatário não criado, erro interno' });
      });
  }, [loading]);

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
            <Typography variant="h5" fontColor={success ? 'success' : 'error'}>{success ? 'Donatário criado!' : 'Houve algum erro na requisição, tente novamente mais tarde'}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button sx={styles.button} variant="contained" onClick={() => setStep(step - 1)}>Voltar</Button>
              {success
                ? <Button sx={styles.button} variant="contained" onClick={() => navigate(`/donee/${id}`)}>Ir para a página do usuário</Button>
                : <Button sx={styles.button} variant="contained" onClick={() => setLoading(true)}>Tentar novamente</Button>}
            </Box>
          </>
        )}
    </Box>
  );
}
