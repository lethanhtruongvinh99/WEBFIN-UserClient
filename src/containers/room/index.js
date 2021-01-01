import
{
  Col,
  Layout, Row,
  Typography
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
    <div className="room-container">
      <Row>
        <Header history={props.history} />
      </Row>
      <Row className="room-row">
        <Col className="playing-area" span={16}>
          <Game Username={username} size={20} TurnName={turnName}></Game>
        </Col>
        {/* <Col className="info-area" span={5}>
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
        </Col> */}
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
