import
{
  Avatar,



  Comment, Tooltip
} from "antd";
import moment from "moment";
import React from "react";
import "./index.css";

const Move = (props) =>
{
  return (
    <Comment
      className="move"
      author={props.username}
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
