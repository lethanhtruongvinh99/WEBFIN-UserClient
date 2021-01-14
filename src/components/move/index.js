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
      author={<a>{props.username}</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p>{props.comment ? props.comment : "Di chuyển tới (1,3)"}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Move;
