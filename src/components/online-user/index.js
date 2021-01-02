import { Row, Col, Avatar, Typography, Button } from "antd";
import { useState } from "react";
const OnlineUser = (props) => {
  const [invited, setInvited] = useState(false);
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
          onClick={() => {
            setInvited(!invited);
          }}
        >
          {invited ? "Đã mời" : "Mời"}
        </Button>
      </Col>
    </Row>
  );
};
export default OnlineUser;
