import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import ReactLoading from 'react-loading';

import Logo from '../components/Logo';
import { useUser } from '../hooks/useUser';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiButton-root': {
      color: 'white',
      marginTop: theme.spacing(3),
    },
  },
  form: {
    width: '100%',
    padding: '0px 15px',
    marginTop: theme.spacing(10),
  },
  divider: {
    marginTop: theme.spacing(3),
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    '& .MuiDivider-root': {
      flex: 1,
    },
  },
  roundBtn: {
    borderRadius: '20px',
    margin: theme.spacing(1),
    '&.MuiButton-fullWidth': {
      width: '75%',
    },
  },
}), { name: 'Home' });

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [isLoginInProcess, setIsLoginInProcess] = useState(false);
  const [password, setPassword] = useState('');
  const [isCredentialsWrong, setIsCredentialsWrong] = useState(false);

  async function onLogin() {
    if(!isLoginInProcess){
      setIsLoginInProcess(true);
      login(email, password)
      .then(()=> history.push('/home'))
      .catch(error => setIsCredentialsWrong(true))
      .finally(() => setIsLoginInProcess(false))
    }
  }

  return (
    <Container className={classes.root} component="main">
      <Logo slogan />
      <form className={classes.form}>
        <div>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            type="email"
            placeholder="Email"
            error={isCredentialsWrong}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            margin="normal"
            id="password"
            type="password"
            placeholder="Senha"
            error={isCredentialsWrong}
            helperText={isCredentialsWrong? "Email/senha incorretos" : undefined}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter')? onLogin() : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </form>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onLogin}
        style={{height: '40px'}}
      >
        {isLoginInProcess?
        <ReactLoading type='bubbles' />
        : 'ENTRAR'
        }
      </Button>

      <div className={classes.divider}>
        <Divider variant="middle" />
        OU
        <Divider variant="middle" />
      </div>

      <Button
        component={Link}
        to="/register"
        className={classes.roundBtn}
        color="primary"
        variant="contained"
        fullWidth
      >
        Registrar
      </Button>

      <Button
        className={classes.roundBtn}
        color="primary"
        variant="contained"
        fullWidth
      >
        Saiba Mais
      </Button>
    </Container>
  );
}

export default Login;
