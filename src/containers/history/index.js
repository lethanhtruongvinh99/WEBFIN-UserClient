import React, {useState, useEffect} from 'react';
import { Layout, Row, Typography, Spin } from "antd";
import RoomItem from "./../../components/room-item/index";
import callServer from '../../utils/NetwordUtils2';
const History = (props) => {
  const [listHistory, setListHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getHistory = async () => {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/history', "GET");
      // console.log(response);
      const data = await response.json();
      // console.log(data.data);
      setListHistory(data.data);
      setIsLoading(false);
    }
    getHistory();
  }, [])
  return (
    <>
      <Layout.Content style={{ padding: "150px 50px", position: "relative" }}>
        <Row justify="center" align="middle">
          <Typography.Title level={2}>Lịch sử trận đấu</Typography.Title>
        </Row>
        <Row
          justify="center"
          align="middle"
          gutter={[30, 30]}
          style={{ margin: "30px 0px" }}
        >
        {isLoading ? <Spin /> : null}
        {listHistory.length > 0 ? listHistory.map(item => (<RoomItem info={item} />)) : null}
        </Row>
      </Layout.Content>
    </>
  );
};

export default History;
