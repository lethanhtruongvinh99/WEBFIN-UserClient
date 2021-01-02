import "./index.css";
import LeaderboardRow from "../../components/leaderboard-row/index";
const { Row, Col, Typography, Card, Carousel } = require("antd");

const Leaderboard = (props) => {
  return (
    <div style={{ padding: "0px 50px", width: "100vw" }}>
      <Row style={{ marginTop: "30px" }} justify="center">
        <Col>
          <Typography.Title level={2}>Xếp hạng</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }} justify="center" gutter={60}>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Số cúp</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              100
            </Typography.Title>
          </Row>
        </Col>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Trận đã chơi</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              200
            </Typography.Title>
          </Row>
        </Col>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Trận thắng</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              100
            </Typography.Title>
          </Row>
        </Col>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Tỉ lệ thắng</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              100
            </Typography.Title>
          </Row>
        </Col>
      </Row>

      <Carousel infinite slidesPerRow={1}>
        <LeaderboardRow />
        <LeaderboardRow />
      </Carousel>
    </div>
  );
};

export default Leaderboard;
