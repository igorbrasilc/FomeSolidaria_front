import React from 'react';
import {
  TextField, Box, Typography, Button, Checkbox, Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import useAlert from '../../../hooks/useAlert';

import styles from '../styles';
import { DoneeFormData } from '..';

interface Props {
    childrenInfos: DoneeFormData['children'],
    setChildrenInfos: any,
    setStep: any,
    step: number,
    hasChildren: boolean,
    setHasChildren: any
}

export default function Step4(props: Props) {
  const {
    childrenInfos, setChildrenInfos, setStep, step, hasChildren, setHasChildren,
  } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<[DoneeFormData['children']]>();
  const { setMessage } = useAlert();
  const [numberOfChildren, setNumberOfChildren] = React.useState(1);
  const key = Number(Object.keys({ ...errors })[0]) as number;

  const onSubmit = (data: DoneeFormData['children'][]) => {
    const valuesInArray = Object.values(data);
    setChildrenInfos(valuesInArray);
    setStep(step + 1);
  };

  React.useEffect(() => {
    if (errors[key]) {
      setMessage({ type: 'error', text: 'Erro no input' });
    }
  }, [errors[key]]);

  function generateChildrenInputs(childrenNumber: number) {
    const childrenInputs = [];
    for (let i = 0; i < childrenNumber; i++) {
      childrenInputs.push(
        <>
          <Typography variant="h5">{`Filho(a) ${i + 1}`}</Typography>
          <TextField
            required
            {...register(`${i}.name`, { required: hasChildren ? 'Nome é necessário' : false, min: 1 })}
            id="outlined-required"
            label="Nome completo"
            defaultValue={childrenInfos[i]?.name || ''}
            disabled={!hasChildren}
          />
          <TextField
            {...register(`${i}.birthdate`)}
            id="date-required"
            type="date"
            label="Data de nascimento"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={childrenInfos[i]?.birthdate || new Date()}
            disabled={!hasChildren}
          />
          <TextField
            {...register(`${i}.contact`)}
            id="contact"
            label="Contato"
            placeholder="Email, telefone, etc"
            defaultValue={childrenInfos[i]?.contact || ''}
            disabled={!hasChildren}
          />
          <Divider />
        </>,
      );
    }
    return childrenInputs;
  }

  return (
    <Box
      component="form"
      sx={styles.formBox}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={styles.title} variant="h4">
        Dados de filhos
      </Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography>Tem filhos?</Typography>
        <Checkbox
          checked={hasChildren}
          onClick={() => {
            setHasChildren(!hasChildren);
          }}
          color="success"
        />
      </Box>
      {hasChildren ? (
        <>
          <TextField
            type="number"
            defaultValue={numberOfChildren}
            onChange={(e) => {
              e.preventDefault();
              setNumberOfChildren(Number(e.target.value));
            }}
            sx={{ width: 20 }}
          />
          <div>
            {generateChildrenInputs(numberOfChildren)}
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
