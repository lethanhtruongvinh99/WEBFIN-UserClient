import { useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import "./index.css";
const DrawModal = (props) => {
  const handleOk = () => {
    props.setModalVisible(false);
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };

  return (
    <Modal title="Thông báo" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <h1 style={{ color: "blue" }}> Draw </h1>
    </Modal>
  );
};

export default DrawModal;
