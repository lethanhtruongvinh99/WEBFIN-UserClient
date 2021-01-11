import { useState } from "react";
import callServer from "./../../../utils/NetworkUtils";
import { Button, Col, Form, Input, Modal, Row } from "antd";
const EnterPasswordModal = (props) => {
  const handleOk = () => {
    props.setPasswordModalVisible(false);
  };

  const handleCancel = () => {
    props.setPasswordModalVisible(false);
  };

  return (
    <Modal centered footer={false} visible={props.passwordModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <div className="board-modal">
        <h1>Nhập mật khẩu</h1>

        <Form onFinish={props.handleEnterPassword} className="board-form">
          <Form.Item style={{ marginTop: "15px" }} name="roomPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input className="board-input" placeholder="Mật khẩu" type="password" />
          </Form.Item>
          <Form.Item>
            <Button style={{ marginBottom: "15px" }} type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EnterPasswordModal;
