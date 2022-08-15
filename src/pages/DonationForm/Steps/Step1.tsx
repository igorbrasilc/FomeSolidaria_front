import React from 'react';
import {
  TextField, Box, Typography, Button, MenuItem, FormControl, InputLabel, FormHelperText,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DonationFormData } from '..';

interface Props {
    donationInfos: DonationFormData['donation'],
    setDonationInfos: any,
    setStep: any,
    step: number
}

export default function Step1(props: Props) {
  const {
    donationInfos, setDonationInfos, setStep, step,
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<DonationFormData['donation']>();
  const { setMessage } = useAlert();
  const key = Object.keys({ ...errors })[0] as keyof DonationFormData['donation'];

  const onSubmit = (data: DonationFormData['donation']) => {
    setDonationInfos(data);
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
        Doação
      </Typography>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
        <Select
          required
          {...register('category', { required: 'Categoria é necessário' })}
          id="outlined-required"
          label="Categoria"
          variant="outlined"
          defaultValue={donationInfos.category}
          sx={{ width: '50vw' }}
        >
          <MenuItem value="CestaP">Cesta Pequena</MenuItem>
          <MenuItem value="CestaG">Cesta Grande</MenuItem>
          <MenuItem value="Leite">Leite</MenuItem>
          <MenuItem value="Móvel">Móvel</MenuItem>
          <MenuItem value="Roupa">Roupa</MenuItem>
          <MenuItem value="Outros">Outros</MenuItem>
        </Select>
        <FormHelperText>Selecione a categoria</FormHelperText>
      </FormControl>
      <div>
        <TextField
          {...register('description')}
          id="description"
          label="Descrição"
          helperText="Descrição é opcional"
          defaultValue={donationInfos.description}
        />
        <TextField
          {...register('quantity')}
          id="quantity"
          label="Quantidade"
          type="number"
          defaultValue={donationInfos.quantity}
        />
      </div>
      <Typography>
        * - Obrigatório
      </Typography>
      <Button sx={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>Próxima etapa</Button>
    </Box>
  );
}
