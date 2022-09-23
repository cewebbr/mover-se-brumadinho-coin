import { useState, useEffect } from 'react';

import { BigNumber } from '@ethersproject/bignumber';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Button from '@material-ui/core/Button';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import api from '../../api';

const useStyles = makeStyles((theme: Theme) => ({
  root:{
    '& >:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
  },
  summary:{
    '& .MuiAccordionSummary-content':{ justifyContent: 'space-between'},
  },
  projectValue:{
    display: 'flex',
    '& *': { margin: '0px 2px'},
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function View(){
  const classes = useStyles();
  const [projects, setProjects] = useState<any>([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);


  async function onClickSign(projectId: BigNumber){
    setOpenBackdrop(true);

    try{
      const txResponse = await api.signProject(projectId);
      await txResponse.wait();
      setProjects(projects.filter((project:any) => project.ID !== projectId));
      setOpenSuccessSnackbar(true);
    }catch(error){
      console.log('Erro:', error);
      setOpenErrorSnackbar(true);
    } finally {
      setOpenBackdrop(false);
    }
  }

  console.log(projects)
  useEffect(() =>{
    api.getAllProjectInCreatedStatus().then(setProjects);
  }, []);

  return(
    <>
      <div className={classes.root}>
        {projects.map((project: any) =>(
          <Accordion key={project.ID}>

            <AccordionSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >

              <Typography>{project.title}</Typography>

              <span className={classes.projectValue}>
                <MonetizationOnIcon/>
                <Typography>{project.amount.toString()}</Typography>
              </span>

            </AccordionSummary>
            
            <AccordionDetails>
              <Typography>
                {project.description}
              </Typography>
            </AccordionDetails>

            <AccordionActions>
              <Button size="small" color="primary" onClick={() => onClickSign(project.ID)}>
                ASSINAR
              </Button>
            </AccordionActions>

          </Accordion>
        ))}
      </div>

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
          Projeto assinado
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
  )
}

export default View;
