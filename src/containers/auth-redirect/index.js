import React, { useEffect } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import { login } from "../../actions/user-actions";

const mapDispatchToProps = { login };
const mapStateToProps = (state) => {
  const { token } = state.user;
  return { token };
};

const AuthRedirect = (props) => {
  useEffect(() => {
    const token = props.match.params.token;
    localStorage.setItem("token", token);
    props.login(token);
    socket.emit("login", { token: token });
    props.history.push("/home");
  }, []);
  return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
