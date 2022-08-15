const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: '400',
      marginBottom: '25px',
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
    button: {
      height: 'auto',
      width: '30vw',
      fontSize: '15px',
      margin: '20px',
    },
    formBox: {
        '& .MuiTextField-root': { 
            m: 2, 
            width: '50vw',
            display: 'flex',
            flexDirection: 'column',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '50px'
    }
  };
  
  export default styles;
  