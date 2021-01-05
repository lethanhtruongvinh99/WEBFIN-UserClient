import { EnterOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import
{
  Avatar,
  Button,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Tooltip,
} from "antd";
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { onlineUsersChanged } from "../../actions/user-actions";
import { socket } from "../../api";
import callServer from "../../utils/NetworkUtils";
import "./index.css";
import QuickJoinButton from "./../../components/quick-join-button/index";

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
  const [loading, setLoading] = useState(false);

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

  const handleObserving = () =>
  {

  }

  return (
    <div>
      <QuickJoinButton />
      <Row style={{ marginTop: "45px" }}>
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Caro Online
        </h1>
      </Row>
      <Row>
        <Input
          className="input"
          placeholder="ID của phòng muốn tham gia"
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
            Tham gia
          </Button>
        </Col>

        <Col>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleObserving()}
          >
            Theo dõi
          </Button>
        </Col>

        {props.token ? <Col>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={openCreateRoomModal}
          >
            Tạo phòng
          </Button>
        </Col> : ""}
      </Row>

      {props.token ? <><h2 style={{ textAlign: "center", margin: "30px auto" }}>Đang online</h2>
        <Row gutter={[16, 0]} className="avatar-row" justify="center">
          {onlineUsers}
        </Row></> : ""}

      <Modal
        centered
        footer={[]}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="board-modal">
          <h1>Tạo phòng</h1>

          <Form
            onFinish={handleCreateRoom}
            name="createBoardForm"
            className="board-form"
          >
            <Form.Item
              style={{ marginTop: "15px" }}
              name="roomName"
              rules={[{ required: true, message: "Please input board name!" }]}
            >
              <Input className="board-input" placeholder="Room name" />
            </Form.Item>
            <Row justify="space-between" gutter={15}>
              <Col span={12}>
                <Form.Item name="roomPassword" rules={[{ type: "string" }]}>
                  <Input
                    type="password"
                    className="board-input"
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="roomTimePerTurn"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số giây",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="board-input"
                    placeholder="Số giây mỗi lượt"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                style={{ marginBottom: "-60px", marginTop: "15px" }}
                type="primary"
                loading={loading}
                onClick={() =>
                {
                  setLoading(!loading);
                }}
                htmlType="submit"
              >
                {loading ? "Đang tạo" : "Tạo phòng"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
