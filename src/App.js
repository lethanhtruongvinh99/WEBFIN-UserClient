import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from './containers/login-form/index';
import RegisterForm from './containers/register-form/index';
import Homepage from './containers/homepage/index';
import AuthRedirect from './containers/auth-redirect/index';
import Room from '../src/containers/room/index';
import
{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Verify from './containers/verify-account';
import RecoveryPassword from './containers/recovery-password';

function App()
{
  return (
    <Router>
      <Switch>
        <Route exact path= "/room/:id" component = {Room} />
        <Route exact path = "/auth/:token" component={AuthRedirect} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/recovery" component={RecoveryPassword}/>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
