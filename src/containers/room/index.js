import { Col, Row, Statistic, Typography, Button, Avatar } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../api";
import ChatMessage from "../../components/chat-messages/index";
import Game from "../../components/game/index";
import callServer from "../../utils/NetworkUtils";
import "./index.css";
import Move from "./../../components/move/index";
import { connect } from 'react-redux';
import { roomJoined, roomLeft } from './../../actions/header-action';
import { animateScroll } from "react-scroll";


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

    props.roomJoined([]);

    setRoomId(urlToken[urlToken.length - 1]);
    socket.emit("join", { roomIdT, token });

    socket.on("turnName", (response) =>
    {
      console.log("---- SOCKET: ON_turnName: ", response);
      setTurnName(response);
    });

    socket.on("message", (response) =>
    {
      setMessages(messages.concat(response));
      scrollToBottom();
    });

    socket.on("Username", (response) =>
    {
      setUsername(response);
      console.log("----Socket: ON Username -----");
      console.log("RESPONE: ", response);
      console.log("USERNAME: ", username);
    });

    return (() =>
    {
      props.roomLeft();
    })

  }, []);

  function scrollToBottom()
  {
    animateScroll.scrollToBottom({
      containerId: "chatBox"
    });
  }


  const sendMessage = async (e) =>
  {
    e.preventDefault();

    console.log(roomIdT + " " + message);

    if (message)
    {
      let newMsg = {
        message,
        username: 'Tôi',
      }
      setMessages([...messages, newMsg]);
      setMessage("");

      scrollToBottom();

      const result = await callServer(
        process.env.REACT_APP_HOST_NAME + "/message/add",
        "post",
        { roomId: roomIdT, content: message }
      );
      console.log(result);
      if (result.status === 200)
      {
        const tmpMsg = { message: result.content, username: result.username };
        //setMessages([...messages, tmpMsg]);
        socket.emit("sendMessage", { roomIdT, message, token });
      }
      // console.log(message);
    }
  };
  // console.log(messages);
  return (
    <div style={{ padding: "200px 50px" }}>
      <Row justify="space-between" align="middle">
        <Col span={5}>
          <Row justify="center" align="middle" gutter={30}>
            <Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>
            <Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>
            <Col>
              <Button type="primary">Bắt đầu trận</Button>
            </Col>
            <Col>
              <Button danger>Xin hoà</Button>
            </Col>
          </Row>
          <Row
            style={{ height: "10vh", marginTop: '30px' }}
            justify="space-between"
            align="middle"
          >
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
          <Row style={{ overflowY: "scroll", height: "50vh" }}>
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
          <Row id="chatBox" style={{ height: '60vh', overflowY: 'scroll' }}>
            <Col>
              {messages.map((item, index) => (
                <ChatMessage
                  key={index}
                  content={item.message}
                  username={item.username}
                />
              ))}
            </Col>
          </Row>


          <Row>
            <TextArea
              disabled={props.token ? false : true}
              placeholder="Type your message here"
              autoSize={{ minRows: 2, maxRows: 2 }}
              className="message-input-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={(e) => sendMessage(e)}
              required={true}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) =>
{
  return {
    token: state.user.token,
  }
}
const mapDispatchToProps = { roomJoined, roomLeft };

export default connect(mapStateToProps, mapDispatchToProps)(Room);
