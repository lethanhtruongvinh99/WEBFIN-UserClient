import { Col, Row, Statistic, Empty, Button, Avatar } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { React, useEffect, useState } from "react";
import { socket } from "../../api";
import ChatMessage from "../../components/chat-messages/index";
import Game from "../../components/game/index";
import callServer from "../../utils/NetworkUtils";
import "./index.css";
import Move from "./../../components/move/index";
import { connect } from "react-redux";
import { roomJoined, roomLeft } from "./../../actions/header-action";
import { animateScroll } from "react-scroll";
import { useHistory } from "react-router";
import showNotification from "../../utils/NotificationUtils";
import Timer from "../../components/timer";

let tempMessages = [];
function scrollToBottom() {
  animateScroll.scrollToBottom({
    containerId: "chatBox",
    duration: "0",
    smooth: false,
  });
}

const Room = (props) => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [turnName, setTurnName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [timePerTurn, setTimePerTurn] = useState(30);
  const roomId = props.match.params.id;
  const history = useHistory();
  const handleBack = async () => {
    //
    // console.log(roomId);
    const result = await callServer(process.env.REACT_APP_HOST_NAME + "/room/leave", "POST", { roomId: roomId });
    console.log(result);
    if (result.status === 200) {
      socket.emit("leaveRoom", { roomId: roomId, sign: result.sign });
      history.push("/home");
    }
  };
  useEffect(() => {
    socket.on("playerBOut", (response) => {
      console.log(response.message);
      showNotification("error", response.message);
    });
  }, []);
  useEffect(() => {
    socket.on("hostOut", (response) => {
      console.log(response.message);
      showNotification("error", response.message);
    });
  }, []);
  useEffect(() => {
    socket.on("guestOut", (response) => {
      console.log(response.message);
      showNotification("error", response.message);
    });
  }, []);

  const handleStartGame = async () => {};
  useEffect(() => {
    props.roomJoined([]);

    const fetchRoomDetails = async () => {
      const result = await callServer(process.env.REACT_APP_HOST_NAME + "/room/detail", "POST", { roomId: roomId });
      tempMessages = result.data.messages;
      setMessages(tempMessages);
      setTimePerTurn(result.data.timePerTurn);
      console.log(result);
    };

    fetchRoomDetails();

    socket.emit("join", { roomIdT: roomId, token });

    socket.on("turnName", (response) => {
      //console.log("---- SOCKET: ON_turnName: ", response);
      setTurnName(response);
    });

    socket.on("message", (response) => {
      //console.log(response);
      response.content = response.message;
      tempMessages = tempMessages.concat([response]);
      setMessages(tempMessages);
      scrollToBottom();
    });

    socket.on("Username", (response) => {
      setUsername(response);
      // console.log("----Socket: ON Username -----");
      // console.log("RESPONE: ", response);
      // console.log("USERNAME: ", username);
    });

    return () => {
      props.roomLeft();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    //console.log(roomId + " " + message);

    if (message) {
      let newMsg = {
        content: message,
        username: "Tôi",
      };
      tempMessages = tempMessages.concat([newMsg]);
      setMessages(tempMessages);
      setMessage("");
      scrollToBottom();

      const result = await callServer(process.env.REACT_APP_HOST_NAME + "/message/add", "post", { roomId: roomId, content: message });
      //console.log(result);
      if (result.status === 200) {
        //console.log('this');
        socket.emit("sendMessage", { roomId, message, token });
      }
      // console.log(message);
    }
  };
  // console.log(messages);
  return (
    <div style={{ padding: "50px" }}>
      <Button
        style={{ paddingTop: "50px" }}
        onClick={() => {
          handleBack();
        }}
      >
        Thoát
      </Button>
      <Row justify="space-between" gutter={30} align="middle">
        <Col id="infoArea" xs={24} sm={24} md={6} lg={6} style={{ padding: "30px", height: "85vh" }}>
          <Row style={{}} justify="space-between" align="middle">
            <Col>
              <Statistic title="Player turn" value="nhatvinh43" />
            </Col>
            <Col>
              <Statistic title="Symbol" value="X " />
            </Col>
            <Col>
              {/* <Statistic title="Time left" value="00:15" /> */}
              <Timer timePerTurn={timePerTurn}></Timer>
            </Col>
          </Row>
          <Row style={{ overflowY: "scroll", height: "65vh", marginTop: "15px" }}>
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

        <Col xs={24} sm={24} md={10} lg={10} className="playing-area" id="infoRow">
          <Row justify="center" align="middle" gutter={30} style={{ marginBottom: "30px" }}>
            <Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>
            <Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>
            <Col>
              <Button disabled={props.token ? false : true} type="primary" onClick={() => handleStartGame()}>
                Bắt đầu trận
              </Button>
            </Col>
            <Col>
              <Button disabled={props.token ? false : true} danger>
                Xin thua
              </Button>
            </Col>
            <Col>
              <Button disabled={props.token ? false : true} danger>
                Xin hoà
              </Button>
            </Col>
          </Row>
          <Game Username={username} size={20} TurnName={turnName}></Game>
        </Col>

        <Col className="chat-box" xs={24} sm={24} md={6} lg={6}>
          <Row id="chatBox" style={{ height: "70vh", overflowY: "scroll" }} align={messages ? "top" : "middle"}>
            <Col>{messages ? messages.map((item, index) => <ChatMessage key={index} content={item.content} username={item.username} />) : <Empty />}</Col>
          </Row>

          <Row>
            <TextArea
              disabled={props.token ? false : true}
              placeholder="Type your message here"
              autoSize={{ minRows: 3, maxRows: 3 }}
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

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};
const mapDispatchToProps = { roomJoined, roomLeft };

export default connect(mapStateToProps, mapDispatchToProps)(Room);
