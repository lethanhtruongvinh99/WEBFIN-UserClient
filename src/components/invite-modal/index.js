import { Modal, Row, Col, Typography, Empty } from "antd";
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
      <Row justify="center" style={{ margin: '15px' }}>
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
          {props.onlineUsers.length > 0 ? props.onlineUsers.map((item, index) => <OnlineUser key={index} username={item.username} />) : <Empty
            style={{ margin: '30px' }}
            description={
              <span>
                Không có người dùng!
        </span>
            }
          />}
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
