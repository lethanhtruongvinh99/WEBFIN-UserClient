import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import
{
  Button,
  Col, Layout, PageHeader,
  Row, Tabs
} from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/user-actions";
import { socket } from "../../api";
import { history } from "../../history";
import ConfirmInvitationModal from "./../confirm-invitation-modal/index";
import InviteModal from "./../invite-modal/index";
import "./index.css";

const { TabPane } = Tabs;

const mapDispatchToProps = { logout };

const HeaderCustom = (props) =>
{
  const [confirmModalVisible, toggleConfirmModal] = useState(false);
  const [activeKey, setActiveKey] = useState(localStorage.getItem('tab') || "home");
  const [title, setTitle] = useState(localStorage.getItem('title') || "Trang chủ");
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

  const setActiveTab = (key) =>
  {
    localStorage.setItem('tab', key);
  }

  const setSiteName = (key) =>
  {
    let siteName = "";
    switch (key)
    {
      case 'rooms': {
        siteName = "Phòng chơi";
        break;
      }
      case 'leaderboard': {
        siteName = "Xếp hạng";
        break;
      }
      case 'history': {
        siteName = "Lịch sử";
        break;
      }
      case 'profile': {
        siteName = "Hồ sơ";
        break;
      }
      default: {
        siteName = "Trang chủ";
        break;
      }
    }

    localStorage.setItem('title', siteName);
    setTitle(siteName)
  }

  const logout = [
    <Row gutter={15}>
      <Col>
        <Button
          onClick={() =>
          {
            toggleConfirmModal(!confirmModalVisible);
          }}
        >
          <BellOutlined /> Lời mời
        </Button>
      </Col>
      <Col>
        <Button danger type="text" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Col>
    </Row>,
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
        onBack={() => history.push('/home')}
        title={title}
        extra={[
          <Row gutter={45} align="middle">
            {props.roomJoined && props.token && props.isHost && props.isAvailable ? (
              <Row gutter={45}>
                <Col>
                  <Button
                    type="primary"
                    onClick={() =>
                    {
                      setModalOpen(!modalOpen);
                    }}
                  >
                    <PlusOutlined style={{ fontWeight: "300" }} />
                    Mời người chơi
                  </Button>
                </Col>
              </Row>
            ) : (
                ""
              )}
            {props.roomJoined ? (
              ""
            ) : (
                <Col style={{ margin: "auto" }}>
                  <Tabs
                    style={{ marginTop: "15px" }}
                    activeKey={activeKey}
                    centered
                    size="large"

                    onTabClick={(key) =>
                    {
                      setActiveKey(key);
                      setActiveTab(key);
                      setSiteName(key);

                      history.push("/" + key);
                    }}
                  >
                    <TabPane tab="Trang chủ" key="home" />
                    <TabPane tab="Phòng chơi" key="rooms" />
                    {props.token ? (
                      <>
                        <TabPane tab="Xếp hạng" key="leaderboard" />
                        <TabPane tab="Lịch sử" key="history" />
                        <TabPane tab="Hồ sơ" key="profile" />{" "}
                      </>
                    ) : (
                        ""
                      )}
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
      <ConfirmInvitationModal
        confirmModalVisible={confirmModalVisible}
        toggleConfirmModal={toggleConfirmModal}
      />
    </Layout.Header>
  );
};

const mapStateToProps = (state) =>
{
  const { token } = state.user;
  const { roomJoined, isHost, isAvailable } = state.header;
  return { token, roomJoined, isHost, isAvailable };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);
