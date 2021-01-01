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
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p>{props.comment}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Move;
