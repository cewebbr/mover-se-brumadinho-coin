import { useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors'; 

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
  }
}));

function FinishedProjects(){
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [executorProjects, setExecutorProjects] = useState<any>([]);
  const [authorityProjects, setAuthorityProjects] = useState<any>([]);
  const [proponentProjects, setProponentProjects] = useState<any>([]);
  
  console.log('executorProjects:', executorProjects);
  console.log('authorityProjects:', authorityProjects);
  console.log('proponentProjects:', proponentProjects);

  function onTabChange(event: any, newValue:number){
    setTabIndex(newValue);
  }

  function getTabProjects(){
    if(tabIndex === 0) return executorProjects
    else if (tabIndex === 1) return authorityProjects
    else return proponentProjects
  }

  async function updateProjectsList(){
    const userWalletAddress = await api.getUserwalletAddress();
    const projectsInExecution = await api.getProjectsOfFinished(userWalletAddress);
    
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
                </Grid>
                  
                <Grid item xs={12} className={classes.divider}>
                  <Typography color='primary'>
                    COMENTÁRIOS
                  </Typography>
                  <Divider className={classes.dividerLine}/>
                </Grid>
              
                {(project.comment.trim()) &&
                  <TextField
                    label="Autoridade"
                    multiline
                    fullWidth
                    inputProps={{readOnly: true}}
                    value={project.comment}
                    variant="outlined"
                  />
                }
              </AccordionDetails>  
            </Accordion>
          ))
        }
      </div>
    </>
  )
}

export default FinishedProjects;