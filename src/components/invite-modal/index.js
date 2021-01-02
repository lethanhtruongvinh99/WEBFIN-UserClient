import { Modal, Row, Col, Typography } from "antd";
import OnlineUser from "./../online-user/index";
const InviteModal = (props) => {
  return (
    <Modal
      centered
      footer={false}
      visible={props.modalOpen}
      onCancel={props.onClose}
    >
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>Mời người chơi</Typography.Title>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[0, 15]}
        style={{ height: "50vh", overflowY: "scroll" }}
      >
        <Col span={24}>
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
        </Col>
      </Row>
    </Modal>
  );
};

export default InviteModal;
