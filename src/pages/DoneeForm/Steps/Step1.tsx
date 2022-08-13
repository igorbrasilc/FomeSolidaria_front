import React from 'react';
import {
  TextField, Box, Typography, Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DoneeFormData } from '..';

interface Props {
    doneeInfos: DoneeFormData['donee'],
    setDoneeInfos: any,
    setStep: any,
    step: number
}

export default function Step1(props: Props) {

  const { doneeInfos, setDoneeInfos, setStep, step } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<DoneeFormData['donee']>();
  const { setMessage } = useAlert();

  const onSubmit = (data: DoneeFormData['donee']) => {
    setDoneeInfos(data);
    setStep(step + 1);
  };

  React.useEffect(() => {
    if (!errors.name) return;
    setMessage({ type: 'error', text: errors.name.message || '' });
  }, [errors]);

  return (
    <Box
      component="form"
      sx={styles.formBox}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={styles.title} variant="h4">
        Dados pessoais
      </Typography>
      <div>
        <TextField
          required
          {...register('name', { required: 'Nome é necessário' })}
          id="outlined-required"
          label="Nome completo"
          defaultValue={doneeInfos.name}
        />
        <TextField
          required
          {...register('birthdate', { required: 'Data de nascimento é necessária' })}
          id="date-required"
          type="date"
          label="Data de nascimento"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={doneeInfos.birthdate}
        />
        <TextField
          {...register('contact')}
          id="contact"
          label="Contato"
          placeholder="Email, telefone, etc"
          defaultValue={doneeInfos.contact}
        />
        <TextField
          {...register('rg')}
          id="rg"
          label="RG"
          placeholder="Digite apenas números"
          defaultValue={doneeInfos.rg}
        />
        <TextField
          {...register('cpf')}
          id="cpf"
          label="CPF"
          placeholder="Apenas números, 11 dígitos"
          defaultValue={doneeInfos.cpf}
        />
        <TextField
          {...register('occupation')}
          id="occupation"
          label="Ocupação"
          defaultValue={doneeInfos.occupation}

        />
      </div>
      <Typography>
        * - Obrigatório
      </Typography>
      <Button sx={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>Próxima etapa</Button>
    </Box>
  );
}
