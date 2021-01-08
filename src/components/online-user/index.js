import { Row, Col, Avatar, Typography, Button } from "antd";
import { useState } from "react";
import { socket } from './../../api/index';
import { connect } from 'react-redux';
import { useLocation } from "react-router";

const OnlineUser = (props) =>
{
  const location = useLocation();
  const [invited, setInvited] = useState(false);

  const handleInvite = () =>
  {
    const roomId = (location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
    socket.emit('sendInvitation', { target: props.username, token: props.token, roomId });
  }

  return (
    <Row style={{ margin: "30px" }} justify="space-between" align="middle">
      <Col>
        <Row justify="space-between" align="middle" gutter={30}>
          <Col>
            <Avatar
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </Col>
          <Col>
            <Typography.Title level={5}>
              {props.username ? props.username : "JohnDoe"}
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col>
        <Button
          shape="round"
          disabled={invited}
          onClick={() =>
          {
            //setInvited(!invited);
            handleInvite(props.username);
          }}
        >
          {invited ? "Đã mời" : "Mời"}
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) =>
{
  return ({ token: state.user.token })
}
export default connect(mapStateToProps)(OnlineUser);
