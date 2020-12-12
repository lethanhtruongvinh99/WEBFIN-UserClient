import { Button, Input, Empty, Row, Col, Avatar, Tooltip } from "antd";
import { PlusOutlined, EnterOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import Header from '../../components/header/index'
import { onlineUsersChanged } from "../../actions/user-actions";
import "./index.css";


const mapDispatchToProps = { onlineUsersChanged };
const mapStateToProps = (state) => {
  const { onlineUsers, token } = state.user;
  return { onlineUsers, token };
};

const Homepage = (props) => {
  useEffect(() => {
    socket.on("onlineUsersChanged", (data) => {
      props.onlineUsersChanged(data.onlineUsers);
    });
  }, []);

  let onlineUsers = !props.token
    ? <Empty description="" />
    : props.onlineUsers.map((item) => (
        <Tooltip title={item.username} placement="top">
          <Avatar className="avatar" size="large">
            {item.username.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
      ));

      const handleCreateRoom = () => {
        props.history.push('/room/123');
      }

  return (
    <div>
      <Header history={props.history} />
      <Row>
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Join or Create a Room
        </h1>
      </Row>
      <Row>
        <Input className="input" placeholder="Room ID to join" />
      </Row>
      <Row gutter={[16, 0]} justify="center">
        <Col>
          <Button type="primary" icon={<EnterOutlined />}>
            Join
          </Button>
        </Col>
        <Col>
          <Button type="dashed" icon={<PlusOutlined />} onClick = {handleCreateRoom}>
            Create a new Room
          </Button>
        </Col>
      </Row>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>Online now</h2>
      <Row gutter={[16, 0]} className="avatar-row" justify="center">
        {onlineUsers}
      </Row>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
