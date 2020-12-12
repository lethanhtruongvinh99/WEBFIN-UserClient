import { Button, Input, Empty, Row, Col, Avatar, Tooltip, Modal, Select, Form } from "antd";
import { PlusOutlined, EnterOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";
import Header from '../../components/header/index'
import { onlineUsersChanged } from "../../actions/user-actions";
import "./index.css";


const mapDispatchToProps = { onlineUsersChanged };
const mapStateToProps = (state) =>
{
  const { onlineUsers, token } = state.user;
  return { onlineUsers, token };
};

const Homepage = (props) =>
{
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOk = () =>
  {
    setModalVisible(false);
  }

  const handleCancel = () =>
  {
    setModalVisible(false);
  }

  useEffect(() =>
  {
    socket.on("onlineUsersChanged", (data) =>
    {
      props.onlineUsersChanged(data.onlineUsers);
    });
  }, []);

  let onlineUsers = !props.token
    ? <Empty description="" />
    : props.onlineUsers.map((item) => (
      <Tooltip title={item.username} placement="top">
        <Avatar className="avatar" size="large">
          {item.username.charAt(0).toUpperCase()}
        </Avatar>
      </Tooltip>
    ));

  const openCreateRoomModal = () =>
  {
    setModalVisible(true);

  }

  const handleCreateRoom = (values) =>
  {
    props.history.push('/room/123');
  }

  return (
    <div>
      <Header history={props.history} />
      <Row>
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Join or Create a Room
        </h1>
      </Row>
      <Row>
        <Input className="input" placeholder="Room ID to join" />
      </Row>
      <Row gutter={[16, 0]} justify="center">
        <Col>
          <Button type="primary" icon={<EnterOutlined />}>
            Join
          </Button>
        </Col>
        <Col>
          <Button type="dashed" icon={<PlusOutlined />} onClick={openCreateRoomModal}>
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
        <div className='board-modal'>
          <h1>New board</h1>

          <Form onFinish={handleCreateRoom} name="createBoardForm" className='board-form'>
            <Form.Item name="boardSize" rules={[{ required: true, message: 'Please choose board size!' }]}>
              <Select style={{ height: '40px', borderRadius: '20px', width: 150 }} placeholder="Board size">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Select>
            </Form.Item>
            <Form.Item name="roomName" rules={[{ required: true, message: 'Please input board name!' }]}>
              <Input className='board-input' placeholder="Room name" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
            </Button>
            </Form.Item>
          </Form>
        </div>

      </Modal>

    </div >
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
