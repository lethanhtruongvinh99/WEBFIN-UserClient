import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../api";
import Board from "../../components/board/index";
import { Col, Row, Statistic, Modal, Button } from "antd";
import "./index.css";
import callServer from "../../utils/NetworkUtils";
import Move from "./../move/index";
import WinModal from "../../containers/room/components/win-modal";
import CloseModal from "../../containers/room/components/close-modal";
import DrawModal from "../../containers/room/components/draw-modal";

function Game(props)
{
  const token = localStorage.getItem("token");
  const _history = useHistory();
  const urlToken = _history.location.pathname.split("/");
  const roomIdT = urlToken[urlToken.length - 1];

  const [isFinish, setIsFinish] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true);

  const [isWinModalVisible, setWinModalVisible] = useState(false);
  const [isCloseModalVisible, setCloseModalVisible] = useState(false);
  const [isDrawModalVisible, setDrawModalVisible] = useState(false);

  //const [turnName, setTurnName] = useState(props.turnName);
  const [state, setState] = useState({
    squares: initMatrix(props.size),
    lastMove: -1,
  });
  const roomId = props.roomId;
  const username = props.Username;
  const sizeBoard = props.size;
  const turnName = props.TurnName;

  useEffect(() =>
  {

    console.log("---------- IN LOAD GAME------------------------")
    let history_board = initMatrix(props.size);
    for (let i = 0; i < props.moveList.length; i++)
    {
      let x = props.moveList[i].x;
      let y = props.moveList[i].y;
      history_board[x][y] = props.moveList[i].symbol;
    }
    setState({
      squares: history_board,
      lastMove: -1,
    });
  }, []);


  useEffect(() =>
  {
    socket.on("sendMove", (response) =>
    {
      if (response.username !== username && isFinish === false)
      {
        props.resetTimer();
        let squares = state.squares;
        const i = Math.floor(response.move / sizeBoard);
        const j = response.move % sizeBoard;
        squares[i][j] = response.opponentTurnName;
        setState({
          squares: squares,
          lastMove: response.move,
        });
        setIsMyTurn(true);
        console.log(state.squares);
        let winner = null;
        winner = calculateWinner(squares, response.move);
        console.log("WINNER_00: ", winner);
        //props.receiveMoveInfoFromGame(response.username, { x: i, y: j });
        if (winner)
        {
          props.setWinner(winner);
          props.handleGameEnd();
          setCloseModalVisible(true);
          setIsFinish(true);
        }
      }
    });
  }, []);

  const sendMove = async (move, opponentTurnName) =>
  {
    socket.emit("sendMove", { roomIdT, move, token, opponentTurnName });
  };

  const handleClick = async (i) =>
  {
    if (!props.isStart || props.isEnd)
    {
      return;
    }

    props.resetTimer();

    let squares = state.squares;
    let x = Math.floor(i / squares[0].length);
    let y = i % squares[0].length;
    if (!isMyTurn || isFinish || calculateWinner(state.squares, state.lastMove) || squares[x][y])
    {
      return;
    }
    squares[x][y] = turnName;
    setState({
      squares,
      lastMove: i,
    });

    setIsMyTurn(false);
    let winner = null;
    winner = calculateWinner(squares, i);
    if (winner)
    {
      props.setWinner(winner);
      props.handleGameEnd();
      if (winner === turnName)
      {
        setWinModalVisible(true);
      }
      setIsFinish(true);
    }
    //props.receiveMoveInfoFromGame(username, { x:x, y:y });
    const result = await callServer(process.env.REACT_APP_HOST_NAME + "/room/move", "POST", { roomId: props.roomId, move: { x: x, y: y, username: username, symbol: turnName } });
    console.log(result);
    if (result.status)
    {
      sendMove(i, turnName);
    } else
    {
      // rollback
    }
  };
  return (
    <div>
      <Row justify="center" align="middle">
        <Col className="game-area">
          <Board squares={state.squares} onClick={(i) => handleClick(i)} size={props.size} />
        </Col>
      </Row>
      <WinModal isModalVisible={isWinModalVisible} setModalVisible={setWinModalVisible} />
      <CloseModal isModalVisible={isCloseModalVisible} setModalVisible={setCloseModalVisible} />
      <DrawModal isModalVisible={isDrawModalVisible} setModalVisible={setDrawModalVisible} />
    </div>
  );
}

function calculateWinner(squares, lastMove)
{
  if (lastMove < 0) return null;
  var i = Math.floor(lastMove / squares[0].length);
  var j = lastMove % squares[i].length;
  var prevTurn = squares[i][j];
  console.log("CAL WINNER:", checkWin(squares, i, j));
  if (checkWin(squares, i, j)) return prevTurn;
  return null;
}

function isValidCord(sizeBoard, x, y)
{
  return !(x < 0 || x >= sizeBoard || y < 0 || y >= sizeBoard);
}

// i,j là nước mới đánh
// return true khi nước cờ (i,j) dành chiến thắng
// false khi chưa ai thắng
function checkWin(squares, i, j)
{
  var prevTurn = squares[i][j];
  var count = 1;
  var x = i;
  var y = j;

  // Thứ tự hướng duyệt:
  // 1. dọc : xuống, lên
  // 2. ngang: xuống, lên
  // 3. chéo chính: xuống, lên
  // 4. chéo phụ: xuống , lên
  var dX = [0, 0, 1, -1, 1, -1, -1, 1];
  var dY = [1, -1, 0, 0, 1, -1, 1, -1];

  // k= 0,1  --> duyệt dọc
  // k= 2,3  --> duyệt ngang
  // k= 4,5  --> duyệt chéo chính
  // k= 6,7  --> duyệt chéo phụ
  for (var k = 0; k < dX.length; ++k)
  {
    // k chẵn thì reset biến count
    // ví dụ k= 0; k= 1 thì vẫn là duyệt trên 1 cột nên count giữ nguyên để phía dưới cộng dồn
    if (k % 2 === 0)
    {
      count = 1;
    }

    while (isValidCord(squares[0].length, x + dX[k], y + dY[k]) && squares[(x += dX[k])][(y += dY[k])] === prevTurn)
    {
      ++count;
      if (count === 5)
      {
        return true;
      }
    }
    // đặt lại giá trị ban đầu để duyệt theo hướng khác
    x = i;
    y = j;
  }
  return false;
}

function isFull(squares)
{
  for (let i = 0; i < squares[0].length; i++)
  {
    for (let j = 0; j < squares[0].length; j++)
    {
      if (squares[i][j]) return false;
    }
  }
  return true;
}
function initMatrix(size)
{
  var matrix = [];
  for (var i = 0; i < size; i++)
  {
    matrix[i] = [];
    for (var j = 0; j < size; j++)
    {
      matrix[i][j] = null;
    }
  }
  return matrix;
}
export default Game;
