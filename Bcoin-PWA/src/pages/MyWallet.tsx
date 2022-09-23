import { useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../api';

const useStyles = makeStyles((theme: Theme) => ({
  account:{
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2rem'
  },
  projectValue:{
    display: 'flex',
    alignItems: 'center',
    '& *': { margin: '0px 2px'},
  },
  tranfer:{
    marginTop: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function MyWallet() {
  const classes = useStyles();
  const wallet = api.getWallet();
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0');
  const [value, setValue] = useState('0');
  const [to, setTo] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  
  function onCopyWalletAddress(){
    navigator.clipboard.writeText(walletAddress);
  }

  async function sendTransaction() {
    setOpenBackdrop(true);

    try{
      const txResponse = await wallet?.sendTransaction({ to, value: value });
      await txResponse?.wait();
      setOpenSuccessSnackbar(true);
    } catch(error){
      console.log('Erro:', error);
      setOpenErrorSnackbar(true);
    } finally {
      setOpenBackdrop(false);
    }
  }

  useEffect(() =>{
    wallet?.getAddress().then(address => setWalletAddress(address));
    wallet?.getBalance().then(balance => setWalletBalance(balance.toString()));
  }, [wallet]);

  return (
    <>
      <Card>
        <CardContent className={classes.account}>
          <Chip label={walletAddress.slice(0, 15) + '...'} color="secondary" onClick={onCopyWalletAddress}/>
          <span className={classes.projectValue}>
            <MonetizationOnIcon />
            <Typography variant="h5">{walletBalance}</Typography>
          </span>
        </CardContent>
      </Card>

      <Accordion className={classes.tranfer}>
        <AccordionSummary>
          Realizar Transferência
        </AccordionSummary>

        <AccordionDetails className={classes.form}>
          <TextField
            className={classes.input}
            id="to"
            label="Destinatário"
            value={to}
            onChange={(e:any) => setTo(e.target.value)}
          />

          <TextField
            className={classes.input}
            id="value"
            label="Valor"
            type="number"
            value={value}
            onChange={(e:any) => setValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </AccordionDetails>

        <AccordionActions>
          <Button size="small" color="primary" onClick={sendTransaction}>
            ENVIAR
          </Button>
        </AccordionActions>
      </Accordion>

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar 
        autoHideDuration={4000} 
        open={openSuccessSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <MuiAlert severity="success" variant="filled" onClose={() => setOpenSuccessSnackbar(false)}>
          Tranferência realizada
        </MuiAlert>
      </Snackbar>

      <Snackbar 
        autoHideDuration={4000} 
        open={openErrorSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setOpenErrorSnackbar(false)} 
      >
        <MuiAlert severity="error" variant="filled" onClose={() => setOpenErrorSnackbar(false)}>
          Erro ao realizar requisição
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default MyWallet;
