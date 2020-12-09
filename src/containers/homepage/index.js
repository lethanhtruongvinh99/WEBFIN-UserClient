import { Button } from "antd";
import { React, useEffect, useState } from "react";
import {socket} from "../../api";
import {connect} from 'react-redux';
import {onlineUsersChanged} from '../../actions/user-actions';

const mapDispatchToProps = {onlineUsersChanged};
const mapStateToProps = (state) => {
  return {onlineUsers: state.onlineUsersm};
}

const Homepage = (props) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      props.history.push("/login");
    }

    socket.emit("login", { token: accessToken });
    socket.on("onlineUsersChanged", (data) => {
      setOnlineUsers(data.onlineUsers);
    });
  }, []);
  const handleLogoutClick = () => {
    socket.emit('logout', {});
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div>
      <h1>Online Users</h1>
      {onlineUsers.map(item => (<div>{item.username}</div>))}
      <Button type="danger" onClick={handleLogoutClick}>
        Log out
      </Button>
    </div>
  );
};
export default Homepage;
