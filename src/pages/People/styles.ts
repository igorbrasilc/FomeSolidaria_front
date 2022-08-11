const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    onLoading: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  nameButton: {
    fontSize: '14px',
    margin: '25px',
  },
  accordion: {
    width: '50vw',
    backgroundColor: 'grey',
  },
  title: {
    fontWeight: '400',
    marginBottom: '15px',
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
        color: 'green'
      }
    },
  },
  button: {
    maxWidth: '200px',
    height: 'auto',
    minWidth: '35vw',
    fontSize: '20px',
    margin: '20px'
  },
};

export default styles;
