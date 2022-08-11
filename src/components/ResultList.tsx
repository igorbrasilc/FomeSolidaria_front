import React, { useCallback, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import useAlert from '../hooks/useAlert';

type Relation = 'Donee' | 'Spouse' | 'Colleague' | 'Child';

export interface Person {
    id: number,
    name: string,
    cpf: string | null,
    rg: string | null,
}

interface ItemsSearched {
    donees: Person[],
    spouses: Person[],
    colleagues: Person[]
}

const styles = {
  box: {
    minWidth: '50vw',
    maxHeight: 250,
    overflowY: 'scroll',
    backgroundColor: 'primary'
  },
  item: {
    '&:hover': {
      backgroundColor: '#FFF',
      cursor: 'pointer',
    },
  },
};

export default function ResultList({ searchInput }: { searchInput: string }) {
  const [itemsSearched, setItemsSearched] = React.useState({
    donees: [],
    colleagues: [],
    spouses: [],
  });
  const [loading, setLoading] = React.useState(true);
  const { setMessage } = useAlert();
  const { token } = useAuth();
  const debouncing = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();

  const debounce = useCallback((func: () => void) => {
    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }
    debouncing.current = setTimeout(() => func(), 1000);
  }, []);

  React.useEffect(() => {
    debounce(() => {
      const promise = api.getSearchResults(searchInput, token);
        promise.then((res) => {
          const { results } = res.data;
          setItemsSearched(results);
          setLoading(false);
        })
        .catch((err) => {
          setMessage({ type: 'error', text: err.message });
          console.error(err);
        });
    });
  }, [searchInput, itemsSearched]);

  function recognizeIcon(relation: Relation) {
    switch (relation) {
      case 'Donee':
        return <PersonIcon />;
      case 'Spouse':
        return <FamilyRestroomIcon />;
      case 'Colleague':
        return <PeopleIcon />;
      default:
        return <PersonIcon />;
    }
  }

  function listItems(items: ItemsSearched) {
    const { donees, colleagues, spouses } = items;
    if (donees.length === 0 && colleagues.length === 0 && spouses.length === 0) {
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

    const doneesArr = getArrayFrom(donees, 'Donee');
    const spousesArr = getArrayFrom(spouses, 'Spouse');
    const colleaguesArr = getArrayFrom(colleagues, 'Colleague');

    return [...doneesArr, ...spousesArr, ...colleaguesArr];
  }

  function verifyDocument(rg: string | null, cpf?: string | null) {
    if (!rg && !cpf) return 'Sem documento';
    if (rg && cpf) return `${rg} - RG; ${cpf} - CPF`;
    if (rg) return `${rg} - RG`;
    return `${cpf} - CPF`;
  }

  function getArrayFrom(arr: Person[], type: Relation) {
    return arr.map((item) => (
      <ListItem key={`${item.id}/${type}`} onClick={() => navigate(`/${type.toLowerCase()}/${item.id}`)} sx={styles.item}>
        <ListItemAvatar>
          <Avatar>
            {recognizeIcon(type)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${item.name}`} secondary={verifyDocument(item.rg, item.cpf)} />
      </ListItem>
    ));
  }

  return (
    <List sx={styles.box}>
      {loading ? <CircularProgress size={60} /> : listItems(itemsSearched)}
    </List>
  );
}
