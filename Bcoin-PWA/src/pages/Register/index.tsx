import { useState, ReactElement } from 'react';

import { useHistory } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Container from '@material-ui/core/Container';

import { useUser } from '../../hooks/useUser';
import Logo from '../../components/Logo';
import Form1 from './Form1';
import Form2 from './Form2';

import api from '../../api';

export type UserRegister = {
  type: 'PJ' | 'PF';
  email: string;
  password: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  cnpj?: string;
  companyName?: string;
  telephone?: string;
  cellPhone?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '632px',
    paddingTop: theme.spacing(2),
  },
  stepper: {
    backgroundColor: '#fafafa',
  },
}), { name: 'Register' });


function Register() {
  const steps = 3;
  const { login } = useUser();
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(1);
  const [userRegister, setUserRegister] = useState<UserRegister>({} as UserRegister);

  async function createNewUser(){
    await api.createUser(userRegister);
    await login(userRegister.email, userRegister.password);
  }

  async function handleNext() {
    if (activeStep < steps - 1) {
      setActiveStep((prev) => prev + 1);
    }
    else {
      // TODO: tratamento de erro
      //       spinner de loading
      createNewUser();
      history.push('/home');
    }
  }

  function getForm(step: number): ReactElement {
    switch (step) {
      case 1:
        return <Form1 user={userRegister} setUser={setUserRegister} />;
      case 2:
        return <Form2 user={userRegister} setUser={setUserRegister} />;
      default:
        setActiveStep(1);
        return getForm(1);
    }
  }

  return (
    <Container className={classes.root}>
      <Logo />
      <main>
        {getForm(activeStep)}
      </main>

      <MobileStepper
        position="static"
        variant="progress"
        steps={steps}
        activeStep={activeStep}
        backButton={(
          <Button size="small" disabled={activeStep === 1} onClick={() => setActiveStep((prev) => prev - 1)}>
            <KeyboardArrowLeft />
            VOLTAR
          </Button>
        )}
        nextButton={(
          <Button size="small" onClick={handleNext}>
            {(activeStep < steps - 1) ? 'PRÓXIMO' : 'REGISTRAR'}
            <KeyboardArrowRight />
          </Button>
        )}
      />
    </Container>
  );
}

export default Register;
