import React from "react";
import { useState, useEffect } from "react";
import { Row, Typography, Layout, Spin } from "antd";
import QuickJoinButton from "../../components/quick-join-button";
import RoomItem from "./../../components/room-item/index";
import callServer from "./../../utils/NetwordUtils2";

const Rooms = (props) => {
  const [listRoom, setListRoom] = useState([]);
  const [waitingLoading, setWaitingLoading] = useState(true);
  //2 list. empty player B and have player B
  useEffect(() => {
    const getListRoom = async () => {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + '/room/', "get");
      const data = await response.json();
      // console.log(data.rooms);
      setListRoom(data.rooms);
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
          {waitingLoading ? <Spin /> : null}
          {listRoom.length > 0 ? listRoom.map(item => (<RoomItem info={item}/>)) : null}
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
          {waitingLoading ? <Spin /> : null}
          {listRoom.length > 0 ? listRoom.map(item => (<RoomItem info={item}/>)) : null}
        </Row>
      </Layout.Content>
    </>
  );
};

export default Rooms;
