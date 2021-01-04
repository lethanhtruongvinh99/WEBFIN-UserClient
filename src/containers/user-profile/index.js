import { Row, Col, Typography, Avatar } from "antd";
const UserProfile = (props) => {
  return (
    <div style={{ padding: "0px 50px", width: "100vw" }}>
      <Row style={{ marginTop: "30px" }} justify="center">
        <Col>
          <Typography.Title level={2}>Thông tin người chơi</Typography.Title>
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }} justify="center">
        <Col>
          <Avatar
            size={64}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }} justify="center">
        <Col>
          <Typography.Title level={4}>
            {props.fullname ? props.fullname : "Phan Nhật Vinh"}
          </Typography.Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Typography.Title level={5} style={{ fontWeight: "300" }}>
            Tham gia ngày {props.joinedAt ? props.joinedAt : "23/06/2077"}
          </Typography.Title>
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }} justify="center" gutter={60}>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Số cúp</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              {props.cups ? props.cups : "200"}
            </Typography.Title>
          </Row>
        </Col>
        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Trận đã chơi</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              {props.totalMatches ? props.totalMatches : "200"}
            </Typography.Title>
          </Row>
        </Col>

        <Col>
          <Row justify="center">
            <Typography.Title level={4}>Tỉ lệ thắng</Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} style={{ fontWeight: "300" }}>
              {props.winRate ? props.winRate : "200"}
            </Typography.Title>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
