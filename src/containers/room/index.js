import { Button, Col, Empty, Row, Statistic, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { set } from "lodash";
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { animateScroll } from "react-scroll";
import { socket } from "../../api";
import ChatMessage from "../../components/chat-messages/index";
import Game from "../../components/game/index";
import callServer from "../../utils/NetworkUtils";
import showNotification from "../../utils/NotificationUtils";
import { roomJoined, roomLeft } from "./../../actions/header-action";
import Move from "./../../components/move/index";
import CloseModal from "./components/close-modal";
import DrawModal from "./components/draw-modal";
import "./index.css";

let tempMessages = [];
function scrollToBottom() {
  animateScroll.scrollToBottom({
    containerId: "chatBox",
    duration: "0",
    smooth: false,
  });
}

let tempTime = 15;

const Room = (props) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [turnName, setTurnName] = useState("");
  const [message, setMessage] = useState("");
  const [isCloseModalVisible, setCloseModalVisible] = useState(false);
  const [isDrawModalVisible, setDrawModalVisible] = useState(false);

  const [host, setHost] = useState({});
  const [playerB, setPlayerB] = useState({});
  const [result, setResult] = useState("");
  const [moveCard, setMoveCard] = useState([]);
  const [moveList, setMoveList] = useState("");

  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [winner, setWinner] = useState("");
  const [readyToStart, setReadyToStart] = useState(false);

  const [messages, setMessages] = useState([]);
  const [timePerTurn, setTimePerTurn] = useState(0);

  const roomId = props.match.params.id;
  const history = useHistory();

  const handleBack = async () => {
    const winnerTemp = username === host.username ? "O" : "X";
    socket.emit("leaveRoom", { roomId: roomId, sign: winnerTemp });
    setWinner(winnerTemp);
    handleGameEnd();

    history.push("/home");
  };
  useEffect(() => {
    socket.on("playerBOut", (response) => {
      console.log(response.message);
      showNotification("error", response.message);
    });
    socket.on("hostOut", (response) => {
      console.log(response.message);
      showNotification("error", response.message);
    });
    //socket.removeAllListeners();
    return () => {
      handleBack();
    };
  }, []);

  const handleStartGame = async () => {
    setIsStart(true);
    setTimePerTurn(tempTime);
    socket.emit("startGame", { roomId });
  };

  useEffect(() => {
    props.roomJoined({ isHost: false, isAvailable: false });

    const fetchRoomDetails = async () => {
      const result = await callServer(process.env.REACT_APP_HOST_NAME + "/room/detail", "POST", { roomId: roomId });
      tempMessages = result.data.messages;
      setMessages(tempMessages);
      tempTime = result.data.timePerTurn;

      setHost(result.data.createdBy);
      setPlayerB(result.data.playerB);
      setResult(result.data.winner?.username);
      console.log(result.data);
      setMoveList(result.data.moveList);

      setIsEnd(result.data.isEnd || result.data.winner ? true : false);

      if (result.data.createdBy && result.data.playerB && (username === result.data.createdBy.username || username === result.data.playerB.username)) {
        setReadyToStart(true);
        socket.emit("setRoomReady", { roomId });
      }

      //Header related states
      props.roomJoined({ isHost: username === result.data.createdBy.username, isAvailable: result.data.isAvailable });
    };

    fetchRoomDetails();

    socket.emit("join", { roomIdT: roomId, token });

    socket.on("turnName", (response) => {
      console.log("---- SOCKET: ON_turnName: ", response);
      setTurnName(response);
    });

    socket.on("message", (response) => {
      response.content = response.message;
      tempMessages = tempMessages.concat([response]);
      setMessages(tempMessages);
      scrollToBottom();
    });

    socket.on("gameStarted", () => {
      setIsStart(true);
      setTimePerTurn(tempTime);
    });

    socket.on("gameEnded", (data) => {
      setResult(data);
      setTimePerTurn(0);
      setIsEnd(true);
    });

    socket.on("roomIsReady", () => {
      setReadyToStart(true);
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

  const handleResign = () => {
    setCloseModalVisible(true);
    const winnerTemp = username === host.username ? "O" : "X";
    setWinner(winnerTemp);
    handleGameEnd();
  };
  const handleOfferDraw = () => {
    setDrawModalVisible(true);
    handleGameEnd();
  };

  const handleTimeout = () => {
    if (!isEnd) {
      const winnerTemp = username === host.username ? "O" : "X";
      setWinner(winnerTemp);
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    socket.emit("endGame", { roomId, winner });
    setTimePerTurn(0);
    setIsEnd(true);
  };

  const resetTimer = () => {
    let newTime = tempTime + 0.000001 === timePerTurn ? tempTime + 0.000002 : tempTime + 0.000001;
    setTimePerTurn(newTime);
  };

  // const receiveMoveInfoFromGame = async (username, move) => {
  //   console.log(username);
  //   console.log(move.x);
  //   console.log(move.y);
  //   let tempCards = moveCard;
  //   tempCards = tempCards.concat({ username: username, move: move });
  //   setMoveCard(tempCards);
  //   //scrollToBottom();
  //   console.log("------here-------");
  //   console.log(moveCard);
  // };
  return (
    <div style={{ padding: "50px" }}>
      <Row justify="space-between" gutter={30} align="middle">
        <Col id="infoArea" xs={24} sm={24} md={6} lg={6} style={{ padding: "30px", height: "85vh" }}>
          <Row justify="space-between" style={{ display: isEnd ? "none" : "flex" }} align="middle">
            <Col>
              <Statistic title="Bạn" value={username} />
            </Col>
            <Col>
              <Statistic title="Ký hiệu" value={turnName} />
            </Col>
            <Col>
              <Statistic.Countdown title="Còn lại" value={Date.now() + 1000 * timePerTurn} onFinish={handleTimeout} />
            </Col>
          </Row>
          <Row style={{ overflowY: "scroll", height: "65vh", marginTop: "15px" }}>
            <Move/>
            <Move/>
            <Move/>
            <Move/>
            <Move/>
            <Move/>
            <Move/>
            <Move/>
            {/* {moveCard.map((item, index) => {
              <Move key={index} username={item.username} comment={"( " + item.move.x + "," + item.move.y + ")"} />;
            })} */}
          </Row>
        </Col>

        <Col xs={24} sm={24} md={10} lg={10} className="playing-area" id="infoRow">
          <Row justify="center" align="middle" gutter={30} style={{ marginBottom: "30px" }}>
            {/*<Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>
            <Col>
              <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Col>*/}
            {isEnd && result ? (
              <Col>
                <Typography.Title level={4}>{"Người chơi " + result + " đã thắng cuộc!"}</Typography.Title>
              </Col>
            ) : (
              <>
                <Col>
                  <Button disabled={props.token && readyToStart ? false : true} loading={readyToStart ? false : true} type="primary" hidden={isStart} onClick={() => handleStartGame()}>
                    {readyToStart ? "Bắt đầu trận" : "Đang đợi người chơi"}
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleResign} disabled={props.token ? false : true} hidden={!isStart} danger>
                    Xin thua
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleOfferDraw} disabled={props.token ? false : true} hidden={!isStart} danger>
                    Xin hoà
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <Game
            handleGameEnd={handleGameEnd}
            winner={winner}
            setWinner={setWinner}
            resetTimer={resetTimer}
            isStart={isStart}
            isEnd={isEnd}
            moveList={moveList}
            Username={username}
            size={20}
            TurnName={turnName}
            roomId={roomId}
            // receiveMoveInfoFromGame={receiveMoveInfoFromGame}
          ></Game>
        </Col>

        <Col className="chat-box" xs={24} sm={24} md={6} lg={6}>
          <Row id="chatBox" style={{ height: "70vh", overflowY: "scroll" }} align={messages ? "top" : "middle"}>
            <Col>{messages ? messages.map((item, index) => <ChatMessage key={index} content={item.content} username={item.username} />) : <Empty />}</Col>
          </Row>

          <Row>
            <TextArea
              disabled={props.token && !isEnd ? false : true}
              placeholder="Nhập tin nhắn"
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
      {/* <WinModal isModalVisible={isWinModalVisible} setModalVisible={setWinModalVisible} /> */}
      <CloseModal isModalVisible={isCloseModalVisible} setModalVisible={setCloseModalVisible} />
      <DrawModal isModalVisible={isDrawModalVisible} setModalVisible={setDrawModalVisible} />
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
