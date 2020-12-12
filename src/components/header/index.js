import React, {useEffect} from "react";
import { PageHeader, Button, Tooltip, Avatar } from "antd";
import "./index.css";
import { connect } from "react-redux";
import { socket } from "../../api";
import {logout} from '../../actions/user-actions';

const mapStateToProps = (state) => {
  const { token } = state.user;
  return { token };
};

const mapDispatchToProps = {logout};


const Header = (props) => {

  const handleLogoutClick = () => {
    socket.emit("logout", {});
    props.logout();
    localStorage.removeItem("token");
    props.history.push("/home");
  };

  const handleLoginClick = () => {
    props.history.push("/login");
  };

  const handleRegisterClick = () => {
    props.history.push("/register");
  }

  const logout = [
    <Button danger onClick={handleLogoutClick}>
      Logout
    </Button>,
  ];
  const loginAndRegister = [
    <Button type="primary" onClick = {handleRegisterClick}>Register</Button>,
    <Button  onClick = {handleLoginClick}>Login</Button>,
  ];
  const content = props.token ? logout : loginAndRegister;

  return (
    <div>
      <PageHeader
        className="header"
        ghost={false}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[<Tooltip title="Example" placement="top">
        <Avatar className="avatar" size="large">
          N
        </Avatar>
      </Tooltip>,<Tooltip title="Example" placement="top">
        <Avatar className="avatar" size="large">
          N
        </Avatar>
      </Tooltip>,<Tooltip title="Example" placement="top">
        <Avatar className="avatar" size="large">
          N
        </Avatar>
      </Tooltip>,content]}
      ></PageHeader>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
