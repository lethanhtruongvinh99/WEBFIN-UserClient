import { Modal, Row, Col, Typography } from "antd";
import { useState } from "react";
const InviteModal = (props) => {
  return (
    <Modal footer={false} visible={props.modalOpen}>
      <Row justify="center">
        <Col>
          <Typography.Title level={4}>Mời người chơi</Typography.Title>
        </Col>
      </Row>
    </Modal>
  );
};

export default InviteModal;
