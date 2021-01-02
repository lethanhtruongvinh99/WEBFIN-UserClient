import { Layout, Row, Typography } from "antd";
import RoomItem from "./../../components/room-item/index";
const History = (props) => {
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
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
        </Row>
      </Layout.Content>
    </>
  );
};

export default History;
