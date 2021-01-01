import
{
  Col,
  Row,
  Statistic
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../api";
import ChatMessage from "../../components/chat-messages/index";
import Game from "../../components/game/index";
import Header from "../../components/header/index";
import callServer from "../../utils/NetworkUtils";
import "./index.css";
import Move from './../../components/move/index';

const Room = (props) =>
{
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [turnName, setTurnName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const history = useHistory();
  const urlToken = history.location.pathname.split("/");
  const roomIdT = urlToken[urlToken.length - 1];

  useEffect(() =>
  {
    // console.log(roomIdT);
    setRoomId(urlToken[urlToken.length - 1]);
    socket.emit("join", { roomIdT, token });
  }, []);
  useEffect(() =>
  {
    socket.on("turnName", (response) =>
    {
      console.log("---- SOCKET: ON_turnName: ", response);
      setTurnName(response);
    });
  }, []);
  useEffect(() =>
  {
    socket.on("message", (response) =>
    {
      setMessages([...messages, response]);
    });
  }, []);
  useEffect(() =>
  {
    socket.on("Username", (response) =>
    {
      setUsername(response);
      console.log("----Socket: ON Username -----");
      console.log("RESPONE: ", response);
      console.log("USERNAME: ", username);
    });
  }, []);
  const sendMessage = async (e) =>
  {
    if (e.keyCode === 13)
    {
      console.log(roomIdT + " " + message);
      if (message)
      {
        const result = await callServer(
          process.env.REACT_APP_HOST_NAME + "/message/add",
          "post",
          { roomId: roomIdT, content: message }
        );
        console.log(result);
        if (result.status === 200)
        {
          const tmpMsg = { message: result.content, username: result.username };
          setMessages([...messages, tmpMsg]);
          socket.emit("sendMessage", { roomIdT, message, token });
        }
        // console.log(message);
        setMessage("");
      } else
      {
        // console.log("null");
      }
    }
  };
  // console.log(messages);
  const handleClick = (i) => { };
  return (
    <div style={{ padding: '50px' }}>
      <Row justify="space-between" align="middle">
        <Col span={5}>
          <Row style={{ height: '10vh' }} justify="space-between" align="middle">
            <Col>
              <Statistic title="Player turn" value="nhatvinh43" />
            </Col>
            <Col>
              <Statistic title="Symbol" value="X " />
            </Col>
            <Col>
              <Statistic title="Time left" value="00:15" />
            </Col>
          </Row>
          <Row style={{ overflowY: 'scroll', height: '60vh' }}>
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

        <Col className="playing-area">
          <Game Username={username} size={20} TurnName={turnName}></Game>
        </Col>

        <Col className="chat-box" span={6}>

          <Row className="message-container">
            {messages.map((item) => (
              <ChatMessage
                key={item.message}
                content={item.message}
                username={item.username}
              />
            ))}
          </Row>

          <Row>
            <TextArea
              placeholder="Type your message here"
              autoSize={{ minRows: 2, maxRows: 2 }}
              className="message-input-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={(e) => sendMessage(e)}
              required={true} />
          </Row>

        </Col>
      </Row>
    </div>
  );
};

export default Room;
