import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Avatar } from "antd";
import callServer from '../../utils/NetwordUtils2';
const UserProfile = (props) =>
{
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [historyGame, setHistoryHame] = useState([]);
  useEffect(() =>
  {
    const getUserProfile = async () =>
    {
      const response = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/profile', "get");
      if (response.status === 200)
      {
        const data = await response.json();
        console.log(data.account);
        setProfile(data.account);
        // console.log(profile);
      } else
      {
        const data = await response.json();
        //Notification('error', "data.message: ERROR");
      }
    }
    const getHistory = async () =>
    {

    }
    getUserProfile();
  }, [])
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
            {profile ? profile.fullName : "Phan Nhật Vinh"}
          </Typography.Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col>
          <Typography.Title level={5} style={{ fontWeight: "300" }}>
            Tham gia ngày {profile ? profile.isCreatedAt : "23/06/2077"}
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
              {profile ? profile.score : "200"}
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
            <Typography.Title level={4}>Trận đã thắng</Typography.Title>
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
