import { EnterOutlined, PlusOutlined } from "@ant-design/icons";
import
{
  Avatar, Button,



  Col, Empty,







  Form, Input,





  Modal, Row,







  Tabs, Tooltip
} from "antd";
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { onlineUsersChanged } from "../../actions/user-actions";
import { socket } from "../../api";
import callServer from "../../utils/NetworkUtils";
import "./index.css";
const { TabPane } = Tabs;

const mapDispatchToProps = { onlineUsersChanged };
const mapStateToProps = (state) =>
{
  const { onlineUsers, token } = state.user;
  return { onlineUsers, token };
};

const Homepage = (props) =>
{
  const [roomId, setRoomId] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOk = () =>
  {
    setModalVisible(false);
  };

  const handleCancel = () =>
  {
    setModalVisible(false);
  };

  useEffect(() =>
  {
    socket.on("onlineUsersChanged", (data) =>
    {
      props.onlineUsersChanged(data.onlineUsers);
    });
  }, []);

  let onlineUsers = !props.token ? (
    <Empty description="" />
  ) : (
      props.onlineUsers.map((item) => (
        <Tooltip title={item.username} placement="top">
          <Avatar className="avatar" size="large">
            {item.username.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
      ))
    );

  const openCreateRoomModal = () =>
  {
    setModalVisible(true);
  };

  const handleJoinRoom = async () =>
  {
    console.log(roomId);
    //logged in and not logged in
    //the first is logged in case
    const data = { roomId: roomId };
    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/room/join",
      "post",
      data
    );
    // console.log(result);
    if (result.status === 200)
    {
      props.history.push(`/room/${result._id}`);
    }
  };

  const handleCreateRoom = async (values) =>
  {
    const data = { ...values };
    // console.log(data);
    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/room/add",
      "post",
      data
    );
    // console.log(result);
    //Call API to create a room, after that, receive room id to go to /room?id={roomId response from server}
    props.history.push(`/room/${result._id}`);
  };

  return (
    <div>
      <Row style={{ marginTop: '45px' }}>
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Join or Create a Room
        </h1>
      </Row>
      <Row>
        <Input
          className="input"
          placeholder="Room ID to join"
          onChange={(e) => setRoomId(e.target.value)}
        />
      </Row>
      <Row gutter={[16, 0]} justify="center">
        <Col>
          <Button
            type="primary"
            icon={<EnterOutlined />}
            onClick={() => handleJoinRoom()}
          >
            Join
          </Button>
        </Col>
        <Col>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={openCreateRoomModal}
          >
            Create a new Room
          </Button>
        </Col>
      </Row>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>Online now</h2>
      <Row gutter={[16, 0]} className="avatar-row" justify="center">
        {onlineUsers}
      </Row>

      <Modal
        centered
        footer={[]}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="board-modal">
          <h1>New room</h1>

          <Form
            onFinish={handleCreateRoom}
            name="createBoardForm"
            className="board-form"
          >
            <Form.Item
              name="roomName"
              rules={[{ required: true, message: "Please input board name!" }]}
            >
              <Input className="board-input" placeholder="Room name" />
            </Form.Item>
            <Form.Item>
              <Button style={{ marginBottom: '-60px' }} type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
