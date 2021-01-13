import React, { useEffect, useState } from 'react';
import LeaderboardItem from "../leaderboard-item/index";
import { Row, Spin } from "antd";
import callServer from '../../utils/NetwordUtils2';

const contentStyle = {
  height: "300px",
};

const LeaderboardRow = (props) =>
{
  const [topPlayer, setTopPlayer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    const getTopPlayer = async () =>
    {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + "/auth/rankchart", "GET");
      // console.log(response);
      const data = await response.json();
      // console.log(data.rankchart);
      setTopPlayer(data.rankchart);
      setIsLoading(false);

    };
    getTopPlayer();
  }, []);
  return (
    <div>
      <Row style={contentStyle} justify="center" align="middle" gutter={30}>
        {isLoading ? <Spin size="large" /> : null}
        {topPlayer.length > 0 ? topPlayer.map((item, index) => (<LeaderboardItem info={item} number={index + 1} />)) : null}
      </Row>
    </div>
  );
};

export default LeaderboardRow;
