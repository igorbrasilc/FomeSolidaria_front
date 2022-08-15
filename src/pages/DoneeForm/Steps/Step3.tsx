import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox, Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DoneeFormData } from '..';

interface Props {
    colleaguesInfos: DoneeFormData['colleagues'],
    setColleaguesInfos: any,
    setStep: any,
    step: number,
    hasColleagues: boolean,
    setHasColleagues: any,
}

export default function Step3(props: Props) {
  const {
    colleaguesInfos, setColleaguesInfos, setStep, step, hasColleagues, setHasColleagues,
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<[DoneeFormData['colleagues']]>();
  const { setMessage } = useAlert();
  const [numberOfColleagues, setNumberOfColleagues] = React.useState(1);
  const key = Number(Object.keys({ ...errors })[0]) as number;

  const onSubmit = (data: DoneeFormData['colleagues'][]) => {
    const valuesInArray = Object.values(data);
    setColleaguesInfos(valuesInArray);
    setStep(step + 1);
  };

  React.useEffect(() => {
    if (errors[key]) {
      setMessage({ type: 'error', text: 'Erro no input' });
    }
  }, [errors[key]]);

  function generateColleagueInputs(colleaguesNumber: number) {
    const colleagueInputs = [];
    for (let i = 0; i < colleaguesNumber; i++) {
      colleagueInputs.push(
        <>
          <Typography variant="h5">{`Colega ${i + 1}`}</Typography>
          <TextField
            required
            {...register(`${i}.name`, { required: hasColleagues ? 'Nome é necessário' : false })}
            id="outlined-required"
            label="Nome completo"
            defaultValue={colleaguesInfos[i]?.name || ''}
            disabled={!hasColleagues}
          />
          <TextField
            {...register(`${i}.contact`)}
            id="contact"
            label="Contato"
            placeholder="Email, telefone, etc"
            defaultValue={colleaguesInfos[i]?.contact || ''}
            disabled={!hasColleagues}
          />
          <TextField
            {...register(`${i}.rg`, { pattern: { value: /\d{7}/, message: 'RG deve ter ao menos 7 números' } })}
            id="rg"
            label="RG"
            placeholder="Apenas números"
            defaultValue={colleaguesInfos[i]?.rg || ''}
            disabled={!hasColleagues}
          />
          <TextField
            {...register(`${i}.cpf`, { pattern: { value: /^\d{11}$/, message: 'CPF deve ter ao menos 11 números' } })}
            id="cpf"
            label="CPF"
            placeholder="Apenas números, 11 dígitos"
            defaultValue={colleaguesInfos[i]?.cpf || ''}
            disabled={!hasColleagues}
          />
          <TextField
            {...register(`${i}.occupation`)}
            id="occupation"
            label="Ocupação"
            defaultValue={colleaguesInfos[i]?.occupation || ''}
            disabled={!hasColleagues}
          />
          <Divider />
        </>,
      );
    }
    return colleagueInputs;
  }

  return (
    <Box
      component="form"
      sx={styles.formBox}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={styles.title} variant="h4">
        Dados de colegas
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography>Tem pessoas que moram no mesmo endereço?</Typography>
        <Checkbox
          checked={hasColleagues}
          onClick={() => {
            setHasColleagues(!hasColleagues);
          }}
          color="success"
        />
      </Box>
      {hasColleagues ? (
        <>
          <TextField
            type="number"
            defaultValue={numberOfColleagues}
            onChange={(e) => {
              e.preventDefault();
              setNumberOfColleagues(Number(e.target.value));
            }}
            sx={{ width: 20 }}
          />
          <div>
            {generateColleagueInputs(numberOfColleagues)}
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
