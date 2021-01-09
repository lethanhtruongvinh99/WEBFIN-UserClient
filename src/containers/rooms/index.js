import React from "react";
import { useState, useEffect } from "react";
import { Row, Typography, Layout, Spin, Pagination } from "antd";
import QuickJoinButton from "../../components/quick-join-button";
import RoomItem from "./../../components/room-item/index";
import callServer from "./../../utils/NetwordUtils2";
import { chunk } from 'lodash';

const PERPAGE = 12;

const Rooms = (props) =>
{
  const [listRoom, setListRoom] = useState([]);

  //Use for storing data from server
  const [waitingRooms, setWaitingRooms] = useState([]);
  const [ongoingRooms, setOngoingRooms] = useState([]);

  //Use for pagination
  const [currentWaitingRooms, setCurrentWaitingRooms] = useState([]);
  const [currentOngoingRooms, setCurrentOngoingRooms] = useState([]);

  const [currentWaitingPge, setCurrentWaitingPage] = useState(1);
  const [currentOngoingPage, setCurrentOngoingPage] = useState(1);

  const [waitingLoading, setWaitingLoading] = useState(true);

  const handleWaitingRoomsPageChange = (number) =>
  {
    setCurrentWaitingRooms(chunk(waitingRooms, PERPAGE)[number - 1]);
    setCurrentWaitingPage(number);
  }

  const handleOngoingRoomsPageChange = (number) =>
  {
    setCurrentOngoingRooms(chunk(ongoingRooms, PERPAGE)[number - 1]);
    setCurrentOngoingPage(number);
  }

  //2 list. empty player B and have player B
  useEffect(() =>
  {
    const getListRoom = async () =>
    {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + '/room/', "get");
      const data = await response.json();
      // console.log(data.rooms);
      setListRoom(chunk(data.rooms, PERPAGE));

      //Placeholder for testing purpose, needs to redesign after api is complete
      setWaitingRooms(data.rooms);
      setOngoingRooms(data.rooms);

      //Set pagination
      setCurrentWaitingRooms(chunk(data.rooms, PERPAGE)[0]);
      setCurrentOngoingRooms(chunk(data.rooms, PERPAGE)[0]);

      setWaitingLoading(!waitingLoading);
    };
    getListRoom();
  }, []);
  return (
    <>
      <Layout.Content style={{ padding: "150px 50px", position: "relative" }}>
        <Row justify="center" align="middle">
          <Typography.Title level={2}>Đang đợi người chơi</Typography.Title>
          <QuickJoinButton />
        </Row>

        <Row
          justify="center"
          align="middle"
          gutter={[30, 30]}
          style={{ margin: "30px 0px" }}
        >
          {waitingLoading ? <Spin size="large" /> : null}
          {currentWaitingRooms.length > 0 ? currentWaitingRooms.map(item => (<RoomItem key={item.roomId} info={item} />)) : null}
        </Row>

        <Row justify="end" style={{ margin: "30px 0px" }}>
          <Pagination current={currentWaitingPge} hideOnSinglePage showSizeChanger={false} showLessItems showQuickJumper total={waitingRooms.length} responsive pageSize={PERPAGE} onChange={handleWaitingRoomsPageChange} />
        </Row>

        <Row justify="center" align="middle">
          <Typography.Title level={2}>Đang diễn ra</Typography.Title>
        </Row>

        <Row
          justify="center"
          align="middle"
          gutter={[30, 30]}
          style={{ margin: "30px 0px" }}
        >
          {waitingLoading ? <Spin size="large" /> : null}
          {currentOngoingRooms.length > 0 ? currentOngoingRooms.map(item => (<RoomItem key={item.roomId} info={item} />)) : null}
        </Row>

        <Row justify="end" style={{ margin: "30px 0px" }}>
          <Pagination current={currentOngoingPage} hideOnSinglePage showSizeChanger={false} showLessItems showQuickJumper total={ongoingRooms.length} responsive pageSize={PERPAGE} onChange={handleOngoingRoomsPageChange} />
        </Row>

      </Layout.Content>
    </>
  );
};

export default Rooms;
