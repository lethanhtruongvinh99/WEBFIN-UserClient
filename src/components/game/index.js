import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../api";
import Board from "../../components/board/index";
import { Col, Row, Statistic } from 'antd';
import "./index.css";
import Move from './../move/index';


function Game(props)
{
  const token = localStorage.getItem("token");
  const _history = useHistory();
  const urlToken = _history.location.pathname.split("/");
  const roomIdT = urlToken[urlToken.length - 1];
  const [isFinish, setIsFinish] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(true);
  //const [turnName, setTurnName] = useState(props.turnName);
  const [state, setState] = useState({
    squares: initMatrix(props.size),
    lastMove: -1,
  });
  const username = props.Username;
  const sizeBoard = props.size;
  const turnName = props.TurnName;

  useEffect(() =>
  {
    socket.on("sendMove", (response) =>
    {
      // console.log(" ON sendMove ---- Opponent username:", response.username);
      // console.log(" ON sendMove ---- Opponent turnname:", response.opponentTurnName);
      if (response.username !== username && isFinish === false)
      {
        let squares = state.squares;
        const i = Math.floor(response.move / sizeBoard);
        const j = response.move % sizeBoard;
        squares[i][j] = response.opponentTurnName;
        setState({
          squares: squares,
          lastMove: response.move,
        });
        setIsMyTurn(true);
        if (calculateWinner(state.squares, state.lastMove))
        {
          setIsFinish(true);
        }
      }
    });
  }, []);

  const sendMove = async (move, opponentTurnName) =>
  {
    socket.emit("sendMove", { roomIdT, move, token, opponentTurnName });
  };

  const handleClick = (i) =>
  {
    let squares = state.squares;
    let x = Math.floor(i / squares[0].length);
    let y = i % squares[0].length;
    if (
      !isMyTurn ||
      isFinish ||
      calculateWinner(state.squares, state.lastMove) ||
      squares[x][y]
    )
    {
      return;
    }
    squares[x][y] = turnName;
    setState({
      squares,
      lastMove: i,
    });
    setIsMyTurn(false);
    if (calculateWinner(squares, i))
    {
      setIsFinish(true);
    }
    sendMove(i, turnName);
  };

  // const winner = calculateWinner(state.squares, state.lastMove);
  // let status;
  // if (winner) {
  //   status = "Winner: " + winner;
  // } else {
  //   if (isFull(state.squares)) status = "### DRAW ###";
  //   else {
  //     var opponentTurnName = turnName === "X" ? "O" : "X";
  //     status = "Next player: " + (isMyTurn ? turnName : opponentTurnName);
  //   }
  // }
  return (
    <Col className="game-area">
      <Board
        squares={state.squares}
        onClick={(i) => handleClick(i)}
        size={props.size}
      />
    </Col>
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
//        false khi chưa ai thắng
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

    while (
      isValidCord(squares[0].length, x + dX[k], y + dY[k]) &&
      squares[(x += dX[k])][(y += dY[k])] === prevTurn
    )
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
