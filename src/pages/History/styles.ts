const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameButton: {
    fontSize: '14px',
    margin: '25px',
  },
  title: {
    fontWeight: '400',
    marginBottom: '15px',
  },
  accordion: {
    width: '60vw',
    backgroundColor: 'grey',
  },
  box: {
    marginTop: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    item: {
      textAlign: 'start',
      '&:hover': {
        cursor: 'pointer',
        color: 'green',
      },
    },
  },
  pagination: {
    marginTop: '25px'
  },
  button: {
    maxWidth: '200px',
    height: 'auto',
    minWidth: '35vw',
    fontSize: '20px',
    margin: '20px',
  },
};

export default styles;
