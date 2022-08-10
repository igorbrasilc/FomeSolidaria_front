import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography, AccordionDetails, AccordionSummary, Accordion, List, ListItemText, ListItem, Divider,
} from '@mui/material';
import styles from '../styles';

export function PersonalDataAccordion() {
  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="personal-data"
      >
        <Typography>Dados pessoais</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="RG documento"
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="CPF documento"
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="Data Nascimento"
            />
          </ListItem>
          <Divider />
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export function AddressDataAccordion() {
  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="personal-data"
      >
        <Typography>Dados pessoais</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="RG documento"
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="CPF documento"
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary="Data Nascimento"
            />
          </ListItem>
          <Divider />
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
