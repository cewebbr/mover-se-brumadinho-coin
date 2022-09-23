import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { UserProvider } from './hooks/useUser';
import theme from './theme';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route path="/">
              <Redirect to={{ pathname: '/' }} />
            </Route>
          </Switch>

        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
