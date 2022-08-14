import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DoneeFormData } from '..';

interface Props {
    addressInfos: DoneeFormData['address'],
    setAddressInfos: any,
    setStep: any,
    step: number,
    hasAddress: boolean,
    setHasAddress: any
}

export default function Step5(props: Props) {
  const {
    addressInfos, setAddressInfos, setStep, step, hasAddress, setHasAddress,
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<DoneeFormData['address']>();
  const { setMessage } = useAlert();
  const key = Object.keys({ ...errors })[0] as keyof DoneeFormData['address'];

  const onSubmit = (data: DoneeFormData['address']) => {
    setAddressInfos(data);
    setStep(step + 1);
  };

  React.useEffect(() => {
    if (errors[key]) {
      setMessage({ type: 'error', text: { ...errors }[key]?.message || 'Erro' });
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
        Endereço
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography>Tem endereço?</Typography>
        <Checkbox checked={hasAddress} onClick={() => setHasAddress(!hasAddress)} color="success" />
      </Box>
      {hasAddress
        ? (
          <>
            <div>
              <TextField
                required
                {...register('street', { required: hasAddress ? 'Rua é necessário' : false })}
                id="outlined-required"
                label="Rua"
                defaultValue={addressInfos.street}
                disabled={!hasAddress}
              />
              <TextField
                required
                {...register('number', { required: hasAddress ? 'Número é necessário' : false })}
                id="outlined-required"
                label="Número"
                defaultValue={addressInfos.number}
                disabled={!hasAddress}
              />
              <TextField
                required
                {...register('district', { required: hasAddress ? 'Bairro é necessário' : false })}
                id="outlined-required"
                label="Bairro"
                defaultValue={addressInfos.district}
                disabled={!hasAddress}
              />
              <TextField
                required
                {...register('city', { required: hasAddress ? 'Cidade é necessário' : false })}
                id="outlined-required"
                label="Cidade"
                defaultValue={addressInfos.city}
                disabled={!hasAddress}
              />
              <TextField
                required
                {...register('state', { required: hasAddress ? 'Estado é necessário' : false })}
                id="outlined-required"
                label="Estado"
                defaultValue={addressInfos.state}
                disabled={!hasAddress}
              />
            </div>
            <Typography>
              * - Obrigatório
            </Typography>
          </>
        ) : <></>}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button sx={styles.button} variant="contained" onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button sx={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>Próxima etapa</Button>
      </Box>
    </Box>
  );
}
