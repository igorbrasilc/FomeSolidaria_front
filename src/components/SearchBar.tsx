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
    minWidth: '50vw',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    minWidth: '60vw',
    marginTop: '20px',
  },
};

export default function SearchBar(
  { setSearchInput, searchInput } : { setSearchInput: any, searchInput: string},
) {
  function handleChange(input: string) {
    setSearchInput(input);
  }

  return (
    <Container sx={styles.container}>
      <Box sx={styles.box}>
        {searchInput === '' ? <PersonSearchIcon sx={styles.icon} color="primary" /> : (
          <Tooltip title="Apagar">
            <IconButton aria-label="erase" onClick={() => setSearchInput('')}>
              <CloseIcon sx={styles.icon} color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <TextField
          variant="standard"
          placeholder="Procure por nome, RG ou CPF"
          sx={styles.input}
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Box>
    </Container>
  );
}
