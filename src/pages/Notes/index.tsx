import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  Typography, Box, Button, Pagination,
} from '@mui/material';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import NotesAccordion from './utils/Accordions';
import { NoteInfos } from '../People/types';

const MAX_NOTES_ITEMS = 5;

export interface NotesHistory {
    doneeName: string,
    doneeId: number,
    notes: NoteInfos[]
}

export default function NotesScreen() {
  const { id } = useParams();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const noteInfos = location.state as NotesHistory;

  if (!token) {
    setMessage({ type: 'error', text: 'Você não tem autorização, faça login' });
    navigate('/');
  }

  return (
    <Box id="container" sx={styles.container}>
      <Header setOpenSideBar={setOpenSideBar} />
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <Box id="box" sx={styles.box}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {`Anotações sobre ${noteInfos.doneeName}`}
        </Typography>
        <Button sx={styles.button} variant="outlined" onClick={() => navigate(`/donee/${noteInfos.doneeId}`)}>
          Voltar
        </Button>
        <NotesAccordion 
          page={page}
          notes={noteInfos.notes}
          maxItems={MAX_NOTES_ITEMS}
        />
        <Pagination
          count={Math.ceil(noteInfos.notes.length / MAX_NOTES_ITEMS)}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={styles.pagination}
        />
      </Box>
    </Box>
  );
};
