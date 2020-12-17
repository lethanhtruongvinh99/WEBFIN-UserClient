import React from "react";
import moment from "moment";
import "./index.css";
import Square from "../square/index";
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
  Comment,
} from "antd";

function Board(props) {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  const renderRow = (i) => {
    const listcol = [];
    for (let j = 0; j < props.size; j++) {
      listcol.push(renderSquare(i * props.size + j));
    }
    return <div className="board-row">{listcol}</div>;
  };
  const renderTable = () => {
    const listrow = [];
    for (let i = 0; i < props.size; i++) listrow.push(renderRow(i));
    return <div>{listrow}</div>;
  };

  return renderTable();
}
export default Board;
