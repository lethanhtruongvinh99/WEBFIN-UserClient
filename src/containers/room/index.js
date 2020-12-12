import
{
  Button,
  Input,
  Empty,
  Row,
  Col,
  Avatar,
  Tooltip,
  Layout,
  Typography,
  Statistic
} from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import ChatMessage from "../../components/chat-messages/index";
import Header from "../../components/header/index";
import { onlineUsersChanged } from "../../actions/user-actions";
import "./index.css";
import TextArea from "antd/lib/input/TextArea";
import Move from '../../components/move/index';

const { Sider } = Layout;
const { Text } = Typography;

const Room = (props) =>
{
  return (
    <div className="room-container">
      <Row>
        <Header history={props.history} />
      </Row>
      <Row className="room-row">
        <Col className="playing-area" span={11}>

        </Col>
        <Col className="info-area" span={5}>

          <Row className="general-info" justify="center" align="middle">
            <Col span={8}>
              <Statistic title="Player turn" value="nhatvinh43" />
            </Col>
            <Col span={8}>
              <Statistic title="Symbol" value="X " />
            </Col>
          </Row>
          <Row className="info-container">
            <Move />
            <Move />
            <Move />
            <Move />
            <Move />
            <Move />
            <Move />
            <Move />
            <Move />
          </Row>
        </Col>
        <Col className="chat-box" span={8}>
          <div className="message-container">
            <div className="message-container-inner">
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
            </div>
          </div>
          <TextArea placeholder="Type your message here"
            autoSize={{ minRows: 2, maxRows: 2 }}
            className="message-input-box"
          ></TextArea>
        </Col>
      </Row>
    </div>
  );
};

export default Room;
