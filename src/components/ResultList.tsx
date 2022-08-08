import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

type Relation = 'Person' | 'Spouse' | 'Colleague' | 'Child';

export interface Person {
    id: number,
    name: string,
    cpf: string,
    rg: string,
    relation: Relation
}

export default function ResultList({ itemsSearched }: { itemsSearched: Person[] | [] }) {
  const styles = {
    box: {
      minWidth: '50vw',
      maxHeight: 250,
      overflowY: 'scroll',
    },
  };

  function recognizeIcon(relation: Relation) {
    switch (relation) {
      case 'Person':
        return <PersonIcon />;
      case 'Spouse':
        return <FamilyRestroomIcon />;
      case 'Colleague':
        return <PeopleIcon />;
      default:
        return <PersonIcon />;
    }
  }

  const listItems = (items: Person[]) => {
    if (items.length === 0) {
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CloseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Não há resultados" />
        </ListItem>
      );
    }

    return items.map((item) => (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {recognizeIcon(item.relation)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${item.name}`} secondary={`${item.cpf} - Documento`} />
      </ListItem>
    ));
  };
  return (
    <List sx={styles.box}>
      {listItems(itemsSearched)}
    </List>
  );
}
