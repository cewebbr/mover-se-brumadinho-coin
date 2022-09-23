import { useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors'; 
import {DropEvent, useDropzone} from 'react-dropzone'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import api from '../../api';

const useStyles = makeStyles((theme: Theme) => ({
  projectContainer:{
    '& >:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
    marginBottom: theme.spacing(3),
  },
  tabs:{
    marginBottom: theme.spacing(3),
  },
  summary:{
    '& .MuiAccordionSummary-content':{ justifyContent: 'space-between'},
  },
  projectValue:{
    display: 'flex',
    '& *': { margin: '0px 2px'},
  },
  divider:{
    overflow: 'hidden',
    display: 'flex',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1)
  },
  dividerLine: {
    width: '100%',
    marginTop: '10px',
    marginLeft: theme.spacing(2)
  },
  projectContent:{
    display: 'flex',
    flexDirection: 'column',
  },
  mediaContainer:{
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  media:{
    aspectRatio: '16/9'
  },
  uploadBtn: {
    padding: theme.spacing(1),
    height: '112px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '76px',
    },
  },
  rejectBtn: {
    color: red[500]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function onDropAccepted(files: File[], event: DropEvent){
  const inputElement = event.target as HTMLInputElement;
  const projectID = inputElement.id;

  api.addFilesToProject(projectID, files);
}

function MyProjects(){
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [executorProjects, setExecutorProjects] = useState<any>([]);
  const [authorityProjects, setAuthorityProjects] = useState<any>([]);
  const [proponentProjects, setProponentProjects] = useState<any>([]);
  const [projectsComments, setProjectsComments] = useState<any>({});
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const { 
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({onDropAccepted, accept: 'image/jpeg, image/png, video/mp4'});

  console.log('executorProjects:', executorProjects);
  console.log('authoriyProjects:', authorityProjects);
  console.log('proponentProjects:', proponentProjects);


  function onTabChange(event: any, newValue:number){
    setTabIndex(newValue);
  }

  function onCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>){
    const projectId = event.target.id;
    const value = event.target.value;

    setProjectsComments({...projectsComments, [projectId]: value});
  }

  async function updateProjectsList(){
    const userWalletAddress = await api.getUserwalletAddress();
    const projectsInExecution = await api.getProjectsOfInExecution(userWalletAddress);
    
    setExecutorProjects([]);
    setAuthorityProjects([]);
    setProponentProjects([]);

    projectsInExecution.forEach((project: any) => {
      if(project.executor === userWalletAddress)
        setExecutorProjects([...executorProjects, project]);
      if (project.authority === userWalletAddress)
        setAuthorityProjects([...authorityProjects, project]);
      if (project.proponent === userWalletAddress)
        setProponentProjects([...proponentProjects, project]);
    });
  }

  function getTabProjects(){
    if(tabIndex === 0) return executorProjects
    else if (tabIndex === 1) return authorityProjects
    else return proponentProjects
  }

  async function onProjectApprove(projectId: string){
    const comment = projectsComments[projectId];

    setOpenBackdrop(true);

    try{
      if(comment)
        await api.addComment(projectId, comment);
      
      const txResponse = await api.finishProject(projectId);
      await txResponse.wait();
      
      updateProjectsList();
      setOpenSuccessSnackbar(true);
    } catch(error){
      console.log('Erro:', error);
      setOpenErrorSnackbar(true);
    } finally {
      setOpenBackdrop(false);
    }
  }

  async function onProjectReject(projectId: string){
    const comment = projectsComments[projectId];

    setOpenBackdrop(true);

    try{
      if(comment){
        const txResponse = await api.addComment(projectId, comment);
        await txResponse.wait();
        updateProjectsList();
        setOpenSuccessSnackbar(true);
      }
    } catch(error){
      console.log('Erro:', error);
      setOpenErrorSnackbar(true);
    } finally {
      setOpenBackdrop(false);
    }
  }

  useEffect(() =>{
    updateProjectsList();
  }, []);

  return(
    <>
      <Tabs className={classes.tabs} value={tabIndex} onChange={onTabChange} centered>
        <Tab label="EXECUTOR" value={0}/>
        <Tab label="AUTORIDADE" value={1}/>
        <Tab label="PROPONENTE" value={2}/>
      </Tabs>

      <div className={classes.projectContainer}>
        {
          getTabProjects().map((project: any) =>(
            <Accordion key={project.ID}>
    
              <AccordionSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
              >
    
                <Typography>{project.title}</Typography>
    
                <span className={classes.projectValue}>
                  <MonetizationOnIcon/>
                  <Typography>{project.amount.toString()}</Typography>
                </span>
    
              </AccordionSummary>
              
              <AccordionDetails className={classes.projectContent}>
                <Typography>
                  {project.description}
                </Typography>

                <Grid className={classes.mediaContainer} container spacing={3}>
                  <Grid item xs={12} className={classes.divider}>
                    <Typography color='primary'>
                      ARQUIVOS
                    </Typography>
                    <Divider className={classes.dividerLine}/>
                  </Grid>
                  
                  {project.files.map((file: any, index: any) => (
                    <Grid item xs={6} sm={4} key={index}>
                    <CardMedia
                      className={classes.media}
                      component={(file.mime_type.startsWith('video'))? 'video': 'img'}
                      controls={file.mime_type.startsWith('video')}
                      src={`https://ipfs.io/ipfs/${file.ipfs_cid}`}
                    />
                  </Grid>
                  ))}

                  {acceptedFiles.map((file, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <CardMedia
                        className={classes.media}
                        component={(file.type.startsWith('video'))? 'video': 'img'}
                        controls={file.type.startsWith('video')}
                        src={URL.createObjectURL(file)}
                      />
                    </Grid>
                  ))}

                  {(tabIndex === 0) &&
                    <Grid item xs={6} sm={4}>
                      <Card {...getRootProps({elevation: 5})}>
                        <input id={project.ID.toString()} {...getInputProps()} />
                        <CardActionArea className={classes.uploadBtn}>
                          <Typography color="textSecondary">
                            Arraste ou clique para adicionar
                          </Typography>
                        </CardActionArea>
                      </Card>  
                    </Grid>
                  }
                </Grid>
                  
                <Grid item xs={12} className={classes.divider}>
                  <Typography color='primary'>
                    COMENTÁRIOS
                  </Typography>
                  <Divider className={classes.dividerLine}/>
                </Grid>

                {(tabIndex === 1) 
                  ?
                  <TextField
                    label="Autoridade"
                    multiline
                    fullWidth
                    id={project.ID.toString()}
                    defaultValue={project.comment}
                    value={projectsComments[project.ID]}
                    onChange={onCommentChange}
                    variant="outlined"
                  />
                  :
                  <TextField
                    style={{display: !project.comment.trim()? 'none': 'initial'}}
                    label="Autoridade"
                    multiline
                    fullWidth
                    inputProps={{readOnly: true}}
                    value={project.comment}
                    variant="outlined"
                  />
                }
              </AccordionDetails>

              {(tabIndex === 1) &&
                <AccordionActions>
                  <Button size="small" color="primary" onClick={() => onProjectApprove(project.ID.toString())}>
                    APROVAR
                  </Button>

                  <Button size="small" className={classes.rejectBtn} onClick={() => onProjectReject(project.ID.toString())}>
                    REPROVAR
                  </Button>
                </AccordionActions>
              }
                
            </Accordion>
          ))
        }
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
          Sucesso
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

export default MyProjects;