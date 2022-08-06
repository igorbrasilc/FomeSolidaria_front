import React from 'react';
import {
  Card, Typography, Box, IconButton, Divider, Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const styles = {
  title: {
    paddingTop: '15px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    maxWidth: '300px',
    minWidth: '50vw',
    minHeight: '150px',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
  },
};

type Categories = 'Cesta P' | 'Cesta G' | 'Leite' | 'Móvel' | 'Roupa' | 'Outros' | '';

export default function StatisticsCard() {
  const [categoryStep, setCategoryStep] = React.useState(1);

  //   React.useEffect(() => {

  //   }, [categoryStep]);

  function recognizeCategory(step: number) {
    let category: Categories = '';
    switch (step) {
      case 1:
        category = 'Cesta P';
        break;
      case 2:
        category = 'Cesta G';
        break;
      case 3:
        category = 'Leite';
        break;
      case 4:
        category = 'Móvel';
        break;
      default:
        category = 'Cesta P';
        break;
    }
    return category;
  }

  function checkCategoryStep(step: number, direction: 'prev' | 'next') {
    if (step === 1 && direction === 'prev') return true;
    if (step === 4 && direction === 'next') return true;

    return false;
  }

  return (
    <Box sx={styles.box}>
        <Tooltip title="Categoria Anterior">
          <IconButton aria-label="previous" onClick={() => setCategoryStep(categoryStep - 1)} disabled={checkCategoryStep(categoryStep, 'prev')}>
            <ArrowBackIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      <Card sx={styles.card}>
        <Typography variant="h5" color="" sx={styles.title}>{recognizeCategory(categoryStep).toUpperCase()}</Typography>
        <Divider style={{ width: '80%' }} />
        <Typography variant="h6" color="#5faa50" fontSize="22px" sx={styles.title}>4000</Typography>
        <Typography variant="h6" fontSize="20px" fontWeight="400">doações feitas</Typography>
      </Card>
        <Tooltip title="Próxima Categoria">
          <IconButton aria-label="next" onClick={() => setCategoryStep(categoryStep + 1)} disabled={checkCategoryStep(categoryStep, 'next')}>
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </Tooltip>
    </Box>
  );
}
