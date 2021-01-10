import React, { useState, useEffect } from 'react';
import { Layout, Row, Typography, Spin, Pagination } from "antd";
import RoomItem from "./../../components/room-item/index";
import callServer from '../../utils/NetwordUtils2';
import { chunk } from 'lodash';

const PERPAGE = 12;

const History = (props) =>
{
  const [listHistory, setListHistory] = useState([]);
  const [currentHistory, setCurrentHistory] = useState([]);
  const [current, setCurrent] = useState(1);

  const handlePageChange = (number) =>
  {
    setCurrentHistory(chunk(listHistory, PERPAGE)[number - 1]);
    setCurrent(number);
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    const getHistory = async () =>
    {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/history', "GET");
      // console.log(response);
      const data = await response.json();
      // console.log(data.data);
      // setListHistory(data.data);
      setCurrentHistory(chunk(data.data, PERPAGE)[0]);
      setIsLoading(false);
    }
    getHistory();
  }, [])
  return (
    <>
      <Layout.Content style={{ padding: "150px 50px", position: "relative", width: '100vw' }}>
        <Row justify="center" align="middle">
          <Typography.Title level={2}>Lịch sử trận đấu</Typography.Title>
        </Row>

        <Row
          justify="center"
          align="middle"
          gutter={[30, 30]}
          style={{ margin: "30px 0px" }}
        >
          {isLoading ? <Spin size="large" /> : null}
          {currentHistory.length > 0 ? currentHistory.map(item => (<RoomItem info={item} />)) : null}
        </Row>

        <Row justify="end" style={{ margin: "30px 0px" }}>
          <Pagination current={current} hideOnSinglePage showSizeChanger={false} showLessItems showQuickJumper total={listHistory.length} responsive pageSize={PERPAGE} onChange={handlePageChange} />
        </Row>

      </Layout.Content>
    </>
  );
};

export default History;
