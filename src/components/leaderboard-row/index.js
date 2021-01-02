import LeaderboardItem from "../leaderboard-item/index";
import { Row } from "antd";

const contentStyle = {
  height: "300px",
};

const LeaderboardRow = (props) => {
  return (
    <div>
      <Row style={contentStyle} justify="center" align="middle" gutter={30}>
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
      </Row>
    </div>
  );
};

export default LeaderboardRow;
