import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from './containers/login-form/index';
import RegisterForm from './containers/register-form/index';
import Homepage from './containers/homepage/index';
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
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route path="/" component={LoginForm}>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
