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
  Statistic,
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
import Move from "../../components/move/index";
import { useHistory } from "react-router";
import callServer from "../../utils/NetworkUtils";

const { Sider } = Layout;
const { Text } = Typography;

const Room = (props) => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const urlToken = history.location.pathname.split("/");
  const roomIdT = urlToken[urlToken.length - 1];
  useEffect(() => {
    // console.log(roomIdT);
    setRoomId(urlToken[urlToken.length - 1]);
    socket.emit("join", { roomIdT, token });
  }, []);
  useEffect(() => {
    socket.on("message", (response) => {
      setMessages([...messages, response]);
    });
  }, []);
  const sendMessage = async (e) => {
    if (e.keyCode === 13) {
      console.log(roomIdT + " " + message);
      if (message) {
        const result = await callServer(
          process.env.REACT_APP_HOST_NAME + "/message/add",
          "post",
          { roomId: roomIdT, content: message }
        );
        console.log(result);
        if (result.status === 200) {
          const tmpMsg = { message: result.content, username: result.username };
          setMessages([...messages, tmpMsg]);
          socket.emit("sendMessage", { roomIdT, message, token });
        }
        // console.log(message);
        setMessage("");
      } else {
        // console.log("null");
      }
    }
  };
  // console.log(messages);
  return (
    <div className="room-container">
      <Row>
        <Header history={props.history} />
      </Row>
      <Row className="room-row">
        <Col className="playing-area" span={11}></Col>
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
              {messages.map((item) => (
                <ChatMessage
                  key={item.message}
                  content={item.message}
                  username={item.username}
                />
              ))}
            </div>
          </div>
          <TextArea
            placeholder="Type your message here"
            autoSize={{ minRows: 2, maxRows: 2 }}
            className="message-input-box"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => sendMessage(e)}
            required={true}
          ></TextArea>
        </Col>
      </Row>
    </div>
  );
};

export default Room;
