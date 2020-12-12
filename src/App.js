import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from './containers/login-form/index';
import RegisterForm from './containers/register-form/index';
import Homepage from './containers/homepage/index';
import AuthRedirect from './containers/auth-redirect/index';
import
{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

function App()
{
  return (
    <Router>
      <Switch>
        <Route exact path = "/auth/:token" component={AuthRedirect} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
