import React from 'react';
import {
  TextField, Box, Typography, Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DoneeFormData } from '..';

interface Props {
    spouseInfos: DoneeFormData['spouse'],
    setSpouseInfos: any,
    setStep: any,
    step: number
}

export default function Step2(props: Props) {

  const { spouseInfos, setSpouseInfos, setStep, step } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<DoneeFormData['spouse']>();
  const { setMessage } = useAlert();

  const onSubmit = (data: DoneeFormData['spouse']) => {
    setSpouseInfos(data);
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
        Dados cônjuge
      </Typography>
      <div>
        <TextField
          required
          {...register('name', { required: 'Nome é necessário' })}
          id="outlined-required"
          label="Nome completo"
          defaultValue={spouseInfos.name}
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
          defaultValue={spouseInfos.birthdate}
        />
        <TextField
          {...register('contact')}
          id="contact"
          label="Contato"
          placeholder="Email, telefone, etc"
          defaultValue={spouseInfos.contact}
        />
        <TextField
          {...register('rg', { pattern: /\d{7}/, message: 'Deve ter ao menos 7 números'})}
          id="rg"
          label="RG"
          placeholder="Digite apenas números"
          defaultValue={spouseInfos.rg}
        />
        <TextField
          {...register('cpf')}
          id="cpf"
          label="CPF"
          placeholder="Apenas números, 11 dígitos"
          defaultValue={spouseInfos.cpf}
        />
        <TextField
          {...register('occupation')}
          id="occupation"
          label="Ocupação"
          defaultValue={spouseInfos.occupation}

        />
      </div>
      <Typography>
        * - Obrigatório
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Button sx={styles.button} variant="contained" onClick={() => setStep(step - 1)}>Etapa anterior</Button>
          <Button sx={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>Próxima etapa</Button>
      </Box>
    </Box>
  );
}
