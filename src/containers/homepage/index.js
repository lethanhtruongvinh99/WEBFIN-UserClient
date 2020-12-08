import { Button } from "antd";
import { React, useEffect, useState } from "react";
import Connect from "../../api";
import openSocket from "socket.io-client";

const Homepage = (props) => {
  const ENDPOINT = "localhost:8080/";
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    console.log("abc");
    console.log(accessToken);
    if (!accessToken) {
      props.history.push("/login");
    }
    // Connect();
    const socket = openSocket(ENDPOINT);
    console.log(socket);
    socket.emit("login", { token: accessToken });
  }, []);
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div>
      <h1>Welcome</h1>
      <p>{localStorage.getItem('token')}</p>
      <Button type="danger" onClick={() => handleLogoutClick()}>
        Log out
      </Button>
    </div>
  );
};
export default Homepage;
