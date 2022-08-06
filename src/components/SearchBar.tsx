import React from 'react';
import {
  Box, TextField, IconButton, Tooltip, Container,
} from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '40px',
  },
  input: {
    marginLeft: '20px',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    minWidth: '60vw',
    marginTop: '20px',
    marginBottom: '20px',
  },
};

export default function SearchBar() {
  const [inputSearch, setInputSearch] = React.useState('');

  function handleChange(input: string) {
    setInputSearch(input);
  }

  return (
    <Container sx={styles.container}>
      <Box sx={styles.box}>
        {inputSearch === '' ? <PersonSearchIcon sx={styles.icon} color="primary" /> : (
          <Tooltip title="Apagar">
            <IconButton aria-label="erase" onClick={() => setInputSearch('')}>
              <CloseIcon sx={styles.icon} color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <TextField variant="standard" placeholder="Procure por nome, RG ou CPF" sx={styles.input} value={inputSearch} onChange={(e) => handleChange(e.target.value)} />
      </Box>
      {inputSearch.length > 3 ? <>Hi</> : <></>}
    </Container>
  );
}
