import { useState } from "react";
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Col, Typography, Modal, Row } from "antd";
import "./index.css"
const WinModal = (props) =>
{
  const handleOk = () =>
  {
    props.setModalVisible(false);
  };

  const handleCancel = () =>
  {
    props.setModalVisible(false);
  };

  return (
    <Modal footer={false} centered visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Row justify="center" align="middle" style={{ margin: '15px' }}>
        <Col>
          <CheckCircleOutlined style={{ fontSize: '48px' }} />
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ margin: '15px' }}>
        <Col>
          <Typography.Title level={3} style={{ fontWeight: '300' }}> Bạn đã thắng </Typography.Title>
        </Col>
      </Row>
    </Modal>
  );
};

export default WinModal;
