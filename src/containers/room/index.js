import {
  Button,
  Input,
  Empty,
  Row,
  Col,
  Avatar,
  Tooltip,
  Layout,
  Typography,
} from "antd";
import { PlusOutlined, EnterOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import ChatMessage from "../../components/chat-messages/index";
import Header from "../../components/header/index";
import { onlineUsersChanged } from "../../actions/user-actions";
import "./index.css";
import TextArea from "antd/lib/input/TextArea";

const { Sider } = Layout;
const { Text } = Typography;

const Room = (props) => {
  return (
    <div>
      <Row>
        <Header history={props.history} />
      </Row>
      <Row className="room-row">
        <Col className="playing-area" span={8}>

        </Col>
        <Col className="info-area" span={8}>

        </Col>
        <Col className="chat-box" span={8}>
          <h2>Chat box</h2>
          <div className="message-container">
            <div className="message-container-inner">
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
            </div>
          </div>
          <TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            className="message-input-box"
          ></TextArea>
        </Col>
      </Row>
    </div>
  );
};

export default Room;
