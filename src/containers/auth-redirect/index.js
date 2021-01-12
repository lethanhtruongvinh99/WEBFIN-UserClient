import React, { useEffect } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import { login } from "../../actions/user-actions";

const mapDispatchToProps = { login };
const mapStateToProps = (state) =>
{
  const { token } = state.user;
  return { token };
};

const AuthRedirect = (props) =>
{
  useEffect(() =>
  {
    const token = props.match.params.token;
    const username = props.match.params.username;

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    props.login(token);
    props.history.push("/home");
  }, []);
  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
