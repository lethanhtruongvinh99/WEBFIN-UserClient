import React, { useState } from "react";
import { PageHeader, Button, Tooltip, Avatar, Tabs, Row, Col } from "antd";
import { history } from "../../history";
import "./index.css";
import { connect } from "react-redux";
import { socket } from "../../api";
import { logout } from "../../actions/user-actions";
import InviteModal from "./../invite-modal/index";

const { TabPane } = Tabs;

const mapStateToProps = (state) => {
  const { token } = state.user;
  return { token };
};

const mapDispatchToProps = { logout };

const HeaderCustom = (props) => {
  const [activeKey, setActiveKey] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogoutClick = () => {
    socket.emit("logout", {});
    props.logout();
    localStorage.removeItem("token");
    history.push("/home");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleRegisterClick = () => {
    history.push("/register");
  };

  const logout = [
    <Button danger onClick={handleLogoutClick}>
      Logout
    </Button>,
  ];
  const loginAndRegister = [
    <Row gutter={15} align="middle">
      <Col>
        <Button
          type="primary"
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          Mời
        </Button>
      </Col>
      <Col>
        <Button type="primary" onClick={handleRegisterClick}>
          Đăng ký
        </Button>
      </Col>
      <Col>
        <Button onClick={handleLoginClick}>Đăng nhập</Button>
      </Col>
    </Row>,
  ];
  const content = props.token ? logout : loginAndRegister;

  return (
    <div>
      <PageHeader
        className="header"
        ghost={false}
        style={{ zIndex: "1" }}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Row gutter={45} align="middle">
            <Col style={{ margin: "auto" }}>
              <Tabs
                style={{ marginTop: "15px" }}
                activeKey={activeKey}
                centered
                size="large"
                onTabClick={(key) => {
                  setActiveKey(key);
                  history.push("/" + key);
                }}
              >
                <TabPane tab="Tham gia" key="home" />
                <TabPane tab="Phòng chơi" key="rooms" />
                <TabPane tab="Xếp hạng" key="leaderboard" />
                <TabPane tab="Lịch sử" key="history" />
              </Tabs>
            </Col>
            {props.isInRoom ? (
              <Col>
                <Tooltip title="Example" placement="top">
                  <Avatar className="avatar" size="large">
                    N
                  </Avatar>
                </Tooltip>
                ,{" "}
                <Tooltip title="Example" placement="top">
                  <Avatar className="avatar" size="large">
                    N
                  </Avatar>
                </Tooltip>
                ,{" "}
                <Tooltip title="Example" placement="top">
                  <Avatar className="avatar" size="large">
                    N
                  </Avatar>
                </Tooltip>
              </Col>
            ) : (
              ""
            )}
            <Col>{content}</Col>
          </Row>,
        ]}
      ></PageHeader>
      <InviteModal
        modalOpen={modalOpen}
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);
