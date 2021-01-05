import
{
  Avatar,
  Col,
  Row,
  Comment, Tooltip
} from "antd";
import moment from "moment";
import React from "react";

const ChatMessage = (props) =>
{
  return (
    <Row>

      <Comment
        author={<a>{props.username}</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            {props.content}
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </Row>

  );
};

export default ChatMessage;
