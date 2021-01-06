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
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { login } from './actions/user-actions';

function App(props)
{
  useEffect(() =>
  {
    const token = localStorage.getItem('token');
    if (token)
    {
      props.login(token);
    }
  }, [])
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

const mapStateToProps = (state) =>
{
  return {
    token: state.user.token,
  }
}

const mapDispacthToProps = { login };

export default connect(mapStateToProps, mapDispacthToProps)(App);
