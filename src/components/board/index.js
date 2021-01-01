import React from "react";
import Square from "../square/index";
import "./index.css";

function Board(props)
{
  const renderSquare = (i) =>
  {
    let x = Math.floor(i / props.size);
    let y = i % props.size;
    return <Square value={props.squares[x][y]} onClick={() => props.onClick(i)} />;
  };
  const renderRow = (i) =>
  {
    const listcol = [];
    for (let j = 0; j < props.size; j++)
    {
      listcol.push(renderSquare(i * props.size + j));
    }
    return <div className="board-row">{listcol}</div>;
  };
  const renderTable = () =>
  {
    const listrow = [];
    for (let i = 0; i < props.size; i++) listrow.push(renderRow(i));
    return <div>{listrow}</div>;
  };

  return renderTable();
}
export default Board;
