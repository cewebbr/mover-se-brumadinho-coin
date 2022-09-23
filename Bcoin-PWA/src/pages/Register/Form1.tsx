import { ChangeEvent } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { UserRegister } from './index';

type Props = {
  user: UserRegister,
  setUser: (user: UserRegister)=> void,
}

function Form1(props: Props) {

  function onChangeField(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id: field, value } = e.target;
    props.setUser({ ...props.user, [field]: value });
  }

  function onchangeSelect(e: ChangeEvent<{ name?: string | undefined, value: unknown }>) {
    const field = e.target.name as string;
    const { value } = e.target;
    props.setUser({ ...props.user, [field]: value });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Select
          autoFocus
          style={{ color: 'green' }}
          labelId="type"
          id="type"
          name="type"
          value={props.user.type || 'PF'}
          onChange={(e) => onchangeSelect(e)}
        >

          <MenuItem value="PF">Pessoa Física</MenuItem>
          <MenuItem value="PJ">Pessoa Jurídica</MenuItem>

        </Select>
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.cnpj || ''}
          onChange={(e) => onChangeField(e)}
          id="cnpj"
          label={(props.user.type === 'PJ')? "CNPJ" : "CPF"}
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.companyName || ''}
          onChange={(e) => onChangeField(e)}
          id="companyName"
          label={(props.user.type === 'PJ')? "Razão Social" : "Nome Completo"}
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.cep || ''}
          onChange={(e) => onChangeField(e)}
          id="cep"
          label="CEP"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.street || ''}
          onChange={(e) => onChangeField(e)}
          id="street"
          label="Logradouro"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item sm={3} xs={4}>
        <TextField
          required
          fullWidth
          value={props.user.number || ''}
          onChange={(e) => onChangeField(e)}
          id="number"
          label="Número"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item sm={9} xs={8}>
        <TextField
          required
          fullWidth
          value={props.user.complement || ''}
          onChange={(e) => onChangeField(e)}
          id="complement"
          label="Complemento"
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          value={props.user.neighborhood || ''}
          onChange={(e) => onChangeField(e)}
          id="neighborhood"
          label="Bairro"
          variant="outlined"
          size="small"
        />
      </Grid>

    </Grid>
  );
}

export default Form1;
