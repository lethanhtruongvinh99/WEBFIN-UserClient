import LeaderboardRow from "../../components/leaderboard-row/index";
import "./index.css";
const { Row, Col, Typography, Carousel, Avatar } = require("antd");

const Leaderboard = (props) =>
{
  return (
    <div style={{ padding: "0px 50px", width: "100vw" }}>

      <Row style={{ marginTop: "30px" }} justify="center">
        <Col>
          <Typography.Title level={2}>Xếp hạng</Typography.Title>
        </Col>
      </Row>

      <Row justify="center" style={{ margin: '30px' }}>
        <Avatar
          size={80}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />

      </Row>

      <Carousel infinite slidesPerRow={1}>
        <LeaderboardRow />
      </Carousel>
    </div>
  );
};

export default Leaderboard;
