import { Modal, Row, Col, Typography } from "antd";
import OnlineUser from "./../online-user/index";
import { connect } from 'react-redux';

const InviteModal = (props) =>
{
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
        gutter={[0, 15]}
        style={{ height: "50vh", overflowY: "scroll" }}
      >
        <Col span={24}>
          {props.onlineUsers?.map((item, index) => <OnlineUser key={index} username={item.username} />)}
        </Col>
      </Row>
    </Modal>
  );
};

const mapStateToProps = (state) =>
{
  return {
    onlineUsers: state.user.onlineUsers,
  }
}

export default connect(mapStateToProps)(InviteModal);
