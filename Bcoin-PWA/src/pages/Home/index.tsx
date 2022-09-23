import { useState } from 'react';

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Logo from '../../components/Logo';
import Sidebar from './Sidebar';
import MyWallet from '../MyWallet'
import View from 'pages/Project/View';
import NewProject from 'pages/Project/NewProject';
import MyProjects from 'pages/Project/MyProjects';
import FinishedProjects from 'pages/Project/FinishedProject';

import api from '../../api';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${sidebarWidth}px)`,
      marginLeft: `${sidebarWidth}px`,
    },
  },

  middle: {
    width: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '550px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },

  appBar: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    zIndex: theme.zIndex.drawer + 1,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '100%',
    // maxWidth: theme.breakpoints.values.sm,
    padding: '0px 20px',
  },

  sidebarToggleButton: {
    marginRight: '10px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  card: {
    marginTop: theme.spacing(3),
    width: '600px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
}));

const sidebarWidth = 240;

function Home() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const history = useHistory();

  function handleSidebarToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  function logOut(){
    api.removeSigner()
    history.push('/');
  }

  return (
    <>
      <AppBar position="sticky" variant="outlined" className={classes.appBar}>

        <Toolbar className={classes.toolbar} variant="dense">

          <IconButton
            className={classes.sidebarToggleButton}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleSidebarToggle}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <Button variant="outlined" size="small" color="primary" onClick={logOut}>SAIR</Button>

        </Toolbar>

      </AppBar>

      <Sidebar width={sidebarWidth} onClose={handleSidebarToggle} open={sidebarOpen} onClick={handleSidebarToggle}/>

      <Box className={classes.root}>
        <Box className={classes.middle} component="main">
          <Switch>
            <Route exact path={path}>
              <h3>Please select a topic.</h3>
            </Route>

            <Route exact path={`${path}/project/create`}>
              <NewProject />
            </Route>

            <Route exact path={`${path}/project/myprojects`}>
              <MyProjects />
            </Route>

            <Route exact path={`${path}/project/view`}>
              <View />
            </Route>

            <Route exact path={`${path}/project/finished`}>
              <FinishedProjects />
            </Route>

            <Route exact path={`${path}/project/mywallet`}>
              <MyWallet />
            </Route>

            <Route path={path}>
              <Redirect to={path} />
            </Route>
          </Switch>
        </Box>
      </Box>
    </>
  );
}

export default Home;
