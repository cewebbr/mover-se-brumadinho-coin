import { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import api from '../../api';

const authorityAddr = process.env.REACT_APP_AUTHORITY_ADDR || '';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
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

function NewProject() {
  const classes = useStyles();
  const [value, setValue] = useState('0');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  async function createProject() {
    setOpenBackdrop(true);

    try{
      const txResponse = await api.createProject(authorityAddr, title, description, value);
      await txResponse.wait()
      setOpenSuccessSnackbar(true);
    } catch(error){
      console.log('Erro:', error);
      setOpenErrorSnackbar(true);
    } finally {
      setOpenBackdrop(false);
    }
  }

  return (
    <>
      <Accordion expanded>
        <AccordionSummary>
          <Typography>Criar Novo Projeto</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.form}>
          <TextField
            className={classes.input}
            id="title"
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            className={classes.input}
            id="value"
            label="Recompensa"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="description"
            label="Descrição"
            value={description}
            multiline
            minRows={4}
            maxRows={15}
            variant="outlined"
            onChange={(e:any) => setDescription(e.target.value)}
          />
        </AccordionDetails>

        <AccordionActions>
          <Button size="small" color="primary" onClick={createProject}>
            CRIAR
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
          Projeto criado
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

export default NewProject;
