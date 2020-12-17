import { React, useEffect, useState } from "react";
import moment from "moment";
import "./index.css";
import Board from "../../components/board/index";
import Square from "../../components/square/index";
import { socket } from "../../api";
import { useHistory } from "react-router";
import Move from "../move/index";

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

function Game(props) {
  const token = localStorage.getItem("token");
  const _history = useHistory();
  const urlToken = _history.location.pathname.split("/");
  const roomIdT = urlToken[urlToken.length - 1];
  const [move, setMove] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState({ turn: true });
  const [state, setState] = useState({
    squares: Array(props.size ** 2).fill(null),
    lastMove: -1,
    stepNumber: 0,
    xIsNext: true,
  });

  useEffect(() => {
    socket.on("sendMove", (response) => {
      setMove([...move, response]);
      if (response.username !== props.Username) {
        const i = response.move;
        let squares = state.squares;
        squares[i] = state.xIsNext ? "X" : "O";
        setState({
          squares: squares,
          lastMove: i,
        });
      }
    });
  }, []);

  const sendMove = async (move) => {
    socket.emit("sendMove", { roomIdT, move, token });
  };

  const handleClick = (i) => {
    const squares = state.squares;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    sendMove(i);
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      squares,
      lastMove: i,
    });
  };

  const winner = calculateWinner(state.squares);

  //   const moves = history.map((step, move) => {
  //     const lastMove = step.lastMove;
  //     const x = Math.floor(lastMove / props.size) + 1;
  //     const y = (lastMove % props.size) + 1;
  //     const desc = move
  //       ? "Go to move #" + "X:" + x + " Y:" + y
  //       : "Go to game start";
  //     return (
  //       <li key={move}>
  //         <Move comment={desc} />
  //       </li>
  //     );
  //   });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (isFull(state.squares)) status = "### DRAW ###";
    else status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game-area">
      <div className="game-board">
        <Board
          squares={state.squares}
          onClick={(i) => handleClick(i)}
          size={props.size}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function isFull(squares) {
  let cnt = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) ++cnt;
  }
  if (cnt === squares.length) return true;
  return false;
}

export default Game;
