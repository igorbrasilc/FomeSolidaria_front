import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox
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
  const [checked, setChecked] = React.useState(false);
  const key = Object.keys({...errors})[0] as keyof DoneeFormData['spouse'];

  const onSubmit = (data: DoneeFormData['spouse']) => {
    setSpouseInfos(data);
    setStep(step + 1);
  };

  React.useEffect(() => {
      if (errors[key]) {
          setMessage({ type: 'error', text: {...errors}[key]?.message || 'Erro' });
      }
  }, [errors[key]]);

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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Typography>Tem cônjuge?</Typography>
        <Checkbox checked={checked} onClick={() => setChecked(!checked)} color="default" />
      </Box>
      <div>
        <TextField
          required
          {...register('name', { required: checked ? 'Nome é necessário' : false })}
          id="outlined-required"
          label="Nome completo"
          defaultValue={spouseInfos.name}
          disabled={!checked}
        />
        <TextField
          required
          {...register('birthdate', { required: checked ? 'Data de nascimento é necessária' : false })}
          id="date-required"
          type="date"
          label="Data de nascimento"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={spouseInfos.birthdate}
          disabled={!checked}
        />
        <TextField
          {...register('contact')}
          id="contact"
          label="Contato"
          placeholder="Email, telefone, etc"
          defaultValue={spouseInfos.contact}
          disabled={!checked}
        />
        <TextField
          {...register('rg', { pattern: {value: /\d{7}/, message: 'RG deve ter ao menos 7 números'}})}
          id="rg"
          label="RG"
          placeholder="Apenas números"
          defaultValue={spouseInfos.rg}
          disabled={!checked}
        />
        <TextField
          {...register('cpf', { pattern: {value: /^\d{11}$/, message: 'CPF deve ter ao menos 11 números'}})}
          id="cpf"
          label="CPF"
          placeholder="Apenas números, 11 dígitos"
          defaultValue={spouseInfos.cpf}
          disabled={!checked}
        />
        <TextField
          {...register('occupation')}
          id="occupation"
          label="Ocupação"
          defaultValue={spouseInfos.occupation}
          disabled={!checked}
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
