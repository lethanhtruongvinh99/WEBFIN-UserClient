import
{
  Avatar,
  Comment
} from "antd";
import React from "react";
import "./index.css";

const Move = (props) =>
{
  return (
    <Comment
      style={{ maxHeight: '100px', width: '100%' }}
      className="move"
      author={props.username ? props.username : "Người chơi 2"}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p>{props.comment ? props.comment : "Đã đánh dấu " + props.symbol + " ở ô (" + props.x + ', ' + props.y + ')'}</p>}
    />
  );
};

export default Move;
