import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography, AccordionDetails, AccordionSummary, Accordion, List, ListItemText, ListItem, Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import styles from '../styles';
import { DonationInfos } from '../../People/types';

interface HistoryProps {
    page: number,
    donations: DonationInfos[],
    maxItems: number
}

export default function HistoryAccordion(props: HistoryProps) {
  const { page, donations, maxItems } = props;

  const indexStart = page * maxItems - maxItems;
  const indexEnd = indexStart + maxItems;

  const donationsToDisplay = donations.slice(indexStart, indexEnd);

  return donationsToDisplay.map((donation) => (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="personal-data"
      >
        <Typography color='black'>{`${dayjs(donation.created_at).format('DD/MM/YY')} - ${donation.category.category}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${donation.quantity} - Quantidade`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${donation.description ? `Descrição: ${donation.description}` : 'Não há descrição'}`}
            />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  ));
}
