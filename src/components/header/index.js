import React, { useState } from "react";
import { PageHeader, Button, Tooltip, Avatar, Layout, Tabs, Row, Col } from "antd";
import { history } from "../../history";
import "./index.css";
import { connect } from "react-redux";
import { socket } from "../../api";
import { logout } from "../../actions/user-actions";
import InviteModal from "./../invite-modal/index";
import ConfirmInvitationModal from './../confirm-invitation-modal/index';


const { TabPane } = Tabs;



const mapDispatchToProps = { logout };

const HeaderCustom = (props) =>
{
  const [confirmModalVisible, toggleConfirmModal] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [activeKey, setActiveKey] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogoutClick = () =>
  {
    socket.emit("logout", {});
    props.logout();
    localStorage.removeItem("token");
    history.push("/home");
  };

  const handleLoginClick = () =>
  {
    history.push("/login");
  };

  const handleRegisterClick = () =>
  {
    history.push("/register");
  };

  const logout = [
    <Row gutter={15}>
      <Col>
        <Button onClick={() => { toggleConfirmModal(!confirmModalVisible) }}>Lời mời</Button>
      </Col>
      <Col>
        <Button danger type="text" onClick={handleLogoutClick}>
          Logout
    </Button>
      </Col>
    </Row>

  ];
  const loginAndRegister = [
    <Row gutter={15} align="middle">
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
    <Layout.Header>
      <PageHeader
        className="header"
        ghost={false}
        style={{ zIndex: "1" }}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Row gutter={45} align="middle">
            {props.roomJoined && props.token ? (
              <Row gutter={45}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() =>
                    {
                      setModalOpen(!modalOpen);
                    }}
                  >
                    Mời
        </Button>
                </Col>
              </Row>


            ) : ""}
            {props.roomJoined ? "" : (
              <Col style={{ margin: "auto" }}>
                <Tabs
                  style={{ marginTop: "15px" }}
                  activeKey={activeKey}
                  centered
                  size="large"
                  onTabClick={(key) =>
                  {
                    setActiveKey(key);
                    history.push("/" + key);
                  }}
                >
                  <TabPane tab="Tham gia" key="home" />
                  <TabPane tab="Phòng chơi" key="rooms" />
                  {props.token ? <><TabPane tab="Xếp hạng" key="leaderboard" />
                    <TabPane tab="Lịch sử" key="history" /> </>
                    : ""}
                </Tabs>
              </Col>
            )}
            <Col>{content}</Col>
          </Row>,
        ]}
      ></PageHeader>
      <InviteModal
        modalOpen={modalOpen}
        onClose={() =>
        {
          setModalOpen(!modalOpen);
        }}
      />
      <ConfirmInvitationModal confirmModalVisible={confirmModalVisible} toggleConfirmModal={toggleConfirmModal} />
    </Layout.Header>
  );
};

const mapStateToProps = (state) =>
{
  const { token } = state.user;
  const { roomJoined } = state.header;
  return { token, roomJoined };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);
