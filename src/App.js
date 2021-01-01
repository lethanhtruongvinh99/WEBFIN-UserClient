import React from 'react';
import
{
  Route, Router,
  Switch, Redirect
} from 'react-router-dom';
import './App.css';
import AuthRedirect from './containers/auth-redirect/index';
import LoginForm from './containers/login-form/index';
import RecoveryPassword from './containers/recovery-password';
import RegisterForm from './containers/register-form/index';
import Verify from './containers/verify-account';
import { history } from './history';
import LayoutCustom from './containers/the-layout/index';


function App()
{
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/auth/:token" component={AuthRedirect} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/recovery" component={RecoveryPassword} />
        <Route path="/" component={LayoutCustom} />
      </Switch>
    </Router>

  );
}

export default App;
