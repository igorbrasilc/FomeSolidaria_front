import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-provisoria.jpg';
import Form from '../../components/Form';
import PasswordInput from '../../components/PasswordInput';
import useAlert from '../../hooks/useAlert';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import styles from './styles';

  interface FormData {
    username: string;
    password: string;
  }

function SignIn() {
  const { signIn } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    if (!formData?.username || !formData?.password) {
      setMessage({ type: 'error', text: 'Todos os campos são obrigatórios!' });
      setLoading(false);
      return;
    }
    const { username, password } = formData;
    try {
      const {
        data: { token },
      } = await api.signIn({ username, password });
      signIn(token);
      setLoading(false);
      setMessage({ type: 'success', text: 'Login concluído!' });
      navigate('/main');
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: 'error',
          text: error.response.data,
        });
        setLoading(false);
        return;
      }

      setMessage({
        type: 'error',
        text: 'Erro, tente novamente em alguns segundos!',
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Bem Vindo!
        </Typography>
        <Box component="img" sx={{ width: 100, height: 100, margin: "0 auto" }} alt="logo" src={Logo} />
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: '1' }} />
          <Typography variant="caption" component="span">
            Administrador
          </Typography>
          <Divider sx={{ flex: '1' }} />
        </Box>
        <TextField
          name="username"
          sx={styles.input}
          label="Nome de usuário"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.username}
          disabled={loading}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          label="Senha"
          onChange={handleInputChange}
          value={formData.password}
          disabled={loading}
        />
        <Box sx={styles.actionsContainer}>
          <Button variant="contained" type="submit" size="large" sx={styles.button} disabled={loading}>
            Entrar
          </Button>
          <Link href="https://igrejacasadooleiro.com.br/fome-solidaria" underline="always">
            <Typography color="secondary">Conheça mais do projeto</Typography>
          </Link>
        </Box>
      </Box>
    </Form>
  );
}

export default SignIn;
