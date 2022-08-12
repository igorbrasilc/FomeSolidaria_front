import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography, AccordionDetails, AccordionSummary, Accordion, List, ListItemText, ListItem, Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import styles from '../styles';
import { NoteInfos } from '../../People/types';

interface NotesProps {
    page: number,
    notes: NoteInfos[],
    maxItems: number
}

export default function NotesAccordion(props: NotesProps) {
  const { page, notes, maxItems } = props;

  const indexStart = page * maxItems - maxItems;
  const indexEnd = indexStart + maxItems;

  if (!notes.length) {
    return (
        <Typography variant="h5">Não há registros</Typography>
    )
  }

  const notesToDisplay = notes.slice(indexStart, indexEnd);

  function verifyReminder(reminder: Date | null) {
    if (!reminder) return 'Não há lembrete';

    return `Lembrete para ${dayjs(reminder).format('DD/MM/YYYY')}`;
  }

  return notesToDisplay.map((note) => (
    <Accordion sx={styles.accordion} key={`${note.id} - Notes`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="personal-data"
      >
        <Typography color='black'>{`${dayjs(note.created_at).format('DD/MM/YY')} - ${verifyReminder(note.reminder)}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`Anotação: ${note.note}`}
            />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  ));
}
