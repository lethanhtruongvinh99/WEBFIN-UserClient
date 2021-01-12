import { Modal, Typography, Row, Col } from "antd";
import { AimOutlined } from '@ant-design/icons';
import "./index.css";
const DrawModal = (props) =>
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
          <AimOutlined style={{ fontSize: '48px' }} />
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ margin: '15px' }}>
        <Col>
          <Typography.Title level={3} style={{ fontWeight: '300' }}> Bạn đã xin hoà! </Typography.Title>
        </Col>
      </Row>
    </Modal>
  );
};

export default DrawModal;
