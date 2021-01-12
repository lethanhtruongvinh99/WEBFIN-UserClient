import { AimOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Typography } from "antd";
import "./index.css";
const CloseModal = (props) =>
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
          <Typography.Title level={3} style={{ fontWeight: '300' }}> Bạn đã đầu hàng! </Typography.Title>
        </Col>
      </Row>
    </Modal>
  );
};

export default CloseModal;
