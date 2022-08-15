import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DonationFormData } from '..';

interface Props {
    noteInfos: DonationFormData['note'],
    setNoteInfos: any,
    setStep: any,
    step: number,
    hasNote: boolean,
    setHasNote: any
}

export default function Step2(props: Props) {
  const {
    noteInfos, setNoteInfos, setStep, step, hasNote, setHasNote,
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<DonationFormData['note']>();
  const { setMessage } = useAlert();
  const key = Object.keys({ ...errors })[0] as keyof DonationFormData['note'];

  const onSubmit = (data: DonationFormData['note']) => {
    setNoteInfos(data);
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
        Observações
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography>Deseja adicionar uma observação?</Typography>
        <Checkbox checked={hasNote} onClick={() => setHasNote(!hasNote)} color="success" />
      </Box>
      {hasNote
        ? (
          <>
            <div>
              <TextField
                required
                {...register('note', { required: hasNote ? 'Observação é necessária' : false })}
                id="outlined-required"
                label="Observação"
                defaultValue={noteInfos.note}
                disabled={!hasNote}
              />
              <TextField
                {...register('reminder')}
                id="reminder"
                type="date"
                helperText="Lembrete não é necessário"
                label="Lembrete"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={noteInfos.reminder}
                disabled={!hasNote}
              />
            </div>
            <Typography>
              * - Obrigatório
            </Typography>
          </>
        ) : <></>}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Button sx={styles.button} variant="contained" onClick={() => setStep(step - 1)}>Voltar</Button>
        <Button sx={styles.button} variant="contained" onClick={handleSubmit(onSubmit)}>Confirmar</Button>
      </Box>
    </Box>
  );
}
