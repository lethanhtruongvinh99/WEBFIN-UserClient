import { Card, Avatar, Col, Statistic, Row, Typography } from "antd";
import "./index.css";
import {} from "@ant-design/icons";

const LeaderboardItem = (props) => {
  // console.log(props.info);
  return (
    <Col>
      <Card hoverable>
        <Row justify="center" style={{ marginBottom: "15px" }}>
          <Col>
            <Typography.Title level={4}>1</Typography.Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Avatar
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "15px" }}>
          <Col>
            <Typography.Text>
              {props.info.username ? props.info.username : "JohnDoe"}
            </Typography.Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "15px" }} gutter={15}>
          <Col>
            <Statistic title="Total matches" value={110} />
          </Col>
          <Col>
            <Statistic title="Cups won" value={props.info.score} />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
export default LeaderboardItem;
