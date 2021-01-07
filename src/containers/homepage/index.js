import { EnterOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { onlineUsersChanged } from "../../actions/user-actions";
import { socket } from "../../api";
import callServer from "../../utils/NetworkUtils";
import QuickJoinButton from "./../../components/quick-join-button/index";
import showNotification from './../../utils/NotificationUtils';
import CreateRoomModal from './components/create-room-modal';
import EnterPasswordModal from './components/enter-password-modal';
import OnlineUsers from './components/online-users';
import "./index.css";

const mapDispatchToProps = { onlineUsersChanged };
const mapStateToProps = (state) =>
{
  const { onlineUsers, token } = state.user;
  return { onlineUsers, token };
};

const Homepage = (props) =>
{
  const [joinButtonLoading, setJoinButtonLoading] = useState(false);
  const [observerButtonLoading, setObserveButtonLoading] = useState(false);
  const [joinMode, setJoinMode] = useState('play')
  const [isModalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");
  const [roomId, setRoomId] = useState("");


  useEffect(() =>
  {
    socket.on("onlineUsersChanged", (data) =>
    {
      props.onlineUsersChanged(data.onlineUsers);
    });
  }, []);

  const openCreateRoomModal = () =>
  {
    setModalVisible(true);
  };

  const handleJoinRoom = async (value) =>
  {

    if (joinMode === 'play')
    {
      setJoinButtonLoading(true);
    } else setObserveButtonLoading(true);

    //logged in and not logged in
    //the first is logged in case
    const data = { roomId: value.roomId };
    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/room/join",
      "post",
      data
    );
    console.log(result);
    if (result.auth)
    {
      // console.log(result.data._id);
      if (result.data.password)
      {
        setRoomPassword(result.data.password);
        setRoomId(result.data._id);
        setPasswordModalVisible(true);
      }
      else props.history.push(`/room/${result.data._id}`);
    }
    else
    {
      showNotification("error", "Không tìm thấy phòng!")
    }

    if (joinMode === 'play')
    {
      setJoinButtonLoading(false);
    } else setObserveButtonLoading(false);
  };

  const handleEnterPassword = async (value) =>
  {
    if (value.roomPassword === roomPassword)
    {
      props.history.push(`/room/${roomId}`);
    }
    else
    {
      showNotification("error", "Sai mật khẩu!")
    }
  }

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
      <QuickJoinButton />
      <Row style={{ marginTop: "45px" }}>
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Caro Online
        </h1>
      </Row>
      <Row>
        <Form onFinish={(e) => { handleJoinRoom(e) }}>
          <Form.Item
            name="roomId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Id phòng muốn tham gia",
              },
            ]}
          >
            <Input
              className="input"
              placeholder="ID của phòng muốn tham gia"
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={[16, 0]} style={{ marginTop: '15px' }} justify="center">
              {props.token ? <Col>
                <Button
                  loading={joinButtonLoading}
                  htmlType="submit"
                  type="primary"
                  onClick={() => { setJoinMode('play') }}
                  icon={<EnterOutlined />}
                >
                  Tham gia
</Button>
              </Col> : ""}
              <Col>
                <Button
                  loading={observerButtonLoading}
                  htmlType="submit"
                  icon={<EyeOutlined />}
                  onClick={() => setJoinMode('observe')}
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
          </Form.Item>
        </Form>
      </Row>

      {props.token ? <><h2 style={{ textAlign: "center", margin: "30px auto" }}>Đang online</h2>
        <Row gutter={[16, 0]} className="avatar-row" justify="center">
          <OnlineUsers onlineUsers={props.onlineUsers} />
        </Row></> : ""}

      <CreateRoomModal isModalVisible={isModalVisible} handleCreateRoom={handleCreateRoom} setModalVisible={setModalVisible} />
      <EnterPasswordModal passwordModalVisible={passwordModalVisible} handleEnterPassword={handleEnterPassword} setPasswordModalVisible={setPasswordModalVisible} />

    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
