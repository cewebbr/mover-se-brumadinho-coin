// TODO: autocomplete => https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
//       Validation
//       Buscar dados do endereco usando CEP

import { useState, ChangeEvent } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { UserRegister } from './index';

type Props = {
  user: UserRegister,
  setUser: (user: UserRegister) => void,
}

function Form2(props: Props) {
  const [password2, setPassword2] = useState('');

  function onChangeField(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id: field, value } = e.target;
    props.setUser({ ...props.user, [field]: value });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          required
          fullWidth
          value={props.user.telephone || ''}
          onChange={(e) => onChangeField(e)}
          id="telephone"
          label="Telefone"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.cellPhone || ''}
          onChange={(e) => onChangeField(e)}
          id="cellPhone"
          label="Telefone Celular"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.email || ''}
          onChange={(e) => onChangeField(e)}
          id="email"
          label="Email"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.password || ''}
          id="password"
          label="Senha"
          variant="outlined"
          size="small"
          type="password"
          onChange={(e) => onChangeField(e)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={password2}
          id="password2"
          label="Repetir Senha"
          variant="outlined"
          size="small"
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}

export default Form2;
