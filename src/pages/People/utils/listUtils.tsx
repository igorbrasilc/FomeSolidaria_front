import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography, AccordionDetails, AccordionSummary, Accordion, List, ListItemText, ListItem, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router';
import {
  ColleagueInfos, SpouseInfos, Address, DoneeInfos, ChildInfos,
} from '../types';
import styles from '../styles';

interface PersonalDataProps {
    infos: SpouseInfos | ColleagueInfos | DoneeInfos
}

interface ChildDataProps {
    infos: ChildInfos[]
}

interface ColleagueDataProps {
    infos: ColleagueInfos[]
}

interface SpouseDataProps {
    infos: SpouseInfos[]
}

interface AddressProps {
    address: Address
}

export function PersonalDataAccordion(props: PersonalDataProps) {
  const { infos } = props;

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
              primary={`${infos.rg ? `${infos.rg} - RG` : 'RG não cadastrado'}`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${infos.cpf ? `${infos.cpf} - CPF` : 'RG não cadastrado'}`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${infos.birthdate ? `${infos.birthdate} - Data de nascimento` : 'Data de nascimento não cadastrada'}`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${infos.contact ? `${infos.contact} - Contato` : 'Contato não cadastrado'}`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`${infos.occupation ? `${infos.occupation} - Ocupação` : 'Ocupação não cadastrada'}`}
            />
          </ListItem>
          <Divider />
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export function AddressDataAccordion(props: AddressProps) {
  const { address } = props;

  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="address-data"
      >
        <Typography>Endereço</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`Rua ${address.street}, número ${address.number}`}
            />
          </ListItem>
          <Divider />
          <ListItem sx={styles.list.item}>
            <ListItemText
              primary={`Bairro ${address.district}`}
            />
          </ListItem>
          <Divider />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export function ColleaguesDataAccordion(props: ColleagueDataProps) {
  const { infos } = props;
  const navigate = useNavigate();

  function returnColleagues(colleaguesArr: ColleagueInfos[]) {
    return colleaguesArr.map((colleague) => (
      <>
        <Divider />
        <ListItem
          sx={styles.list.item}
          key={colleague.name}
          onClick={() => navigate(`/colleague/${colleague.id}`)}
        >
          <ListItemText
            primary={colleague.name}
            secondary="Ir para"
          />
        </ListItem>
      </>
    ));
  }

  return (
    <Accordion sx={styles.accordion} disabled={!infos.length}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="colleagues-data"
      >
        <Typography>Colegas</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          {returnColleagues(infos)}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export function SpouseDataAccordion(props: SpouseDataProps) {
  const { infos } = props;
  const navigate = useNavigate();

  function returnSpouse(spouseArr: SpouseInfos[]) {
    return spouseArr.map((spouse) => (
      <>
        <Divider />
        <ListItem sx={styles.list.item} key={spouse.name} onClick={() => navigate(`/spouse/${spouse.id}`)}>
          <ListItemText
            primary={spouse.name}
            secondary="Ir para"
          />
        </ListItem>
      </>
    ));
  }

  return (
    <Accordion sx={styles.accordion} disabled={!infos.length}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="spouse-data"
      >
        <Typography>Cônjuge</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          {returnSpouse(infos)}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export function ChildDataAccordion(props: ChildDataProps) {
  const { infos } = props;

  function returnChild(childArr: ChildInfos[]) {
    return childArr.map((child) => (
      <>
        <Divider />
        <ListItem sx={styles.list.item} key={child.name}>
          <ListItemText
            primary={child.name}
            secondary={`${child.birthdate} - Data de nascimento`}
          />
        </ListItem>
      </>
    ));
  }

  return (
    <Accordion sx={styles.accordion} disabled={!infos.length}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="Child-data"
      >
        <Typography>Filhos(as)</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={styles.list} dense>
          {returnChild(infos)}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
