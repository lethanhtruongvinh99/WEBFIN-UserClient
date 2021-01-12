import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Divider, Spin, Modal } from "antd";
import
{
  UserOutlined,
  LockOutlined,
  FacebookFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import callServer from "../../utils/NetworkUtils";
import showNotification from "../../utils/NotificationUtils";
import { socket } from "../../api";
import { connect } from "react-redux";
import { login } from "../../actions/user-actions";
import "./index.css";

const mapDispatchToProps = { login };
const mapStateToProps = (state) =>
{
  const { token } = state.user;
  return { token };
};

const LoginForm = (props) =>
{
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [recoveryPasswordUsername, setRecoveryPasswordUsername] = useState("");

  const showModal = () =>
  {
    setIsModalVisible(true);
  };

  const handleOk = async () =>
  {
    const data = { username: recoveryPasswordUsername };
    const result = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/recoveryrequest', "post", data);
    if (result.auth)
    {
      showNotification("error", result.message);
      setIsModalVisible(false);
    } else
    {
      showNotification("error", result.message);
    }

  };

  const handleCancel = () =>
  {
    setIsModalVisible(false);
  };

  const handleRecoveryUsername = (e) =>
  {
    setRecoveryPasswordUsername(e.target.value);
  }

  const onFinish = async (values) =>
  {
    //console.log("Received values of form: ", values);
    setIsLoading(true);
    const data = {
      ...values,
    };

    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/auth/login",
      "post",
      data
    );
    //console.log(result);
    if (result.auth)
    {
      setIsLoading(false);
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("username", result.username);
      props.login(result.accessToken);
      socket.emit("login", { token: result.accessToken });
      props.history.push("/home");
    } else
    {
      setIsLoading(false);
      showNotification("error", result.message);
    }
  };

  const handleRegisterClick = () =>
  {
    props.history.push("/register");
  };

  const handleFacebookLogin = () =>
  {
    window.open(process.env.REACT_APP_HOST_NAME + "/auth/facebook", "_self");
  };

  const handleGoogleLogin = () =>
  {
    window.open(process.env.REACT_APP_HOST_NAME + "/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <h1 style={{ textAlign: "center", fontSize: "32px" }}>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Button
          type="primary"
          onClick={handleGoogleLogin}
          danger
          className="login-form-button"
          style={{ margin: "10px 0px" }}
          icon={<GoogleCircleFilled />}
        >
          Đăng nhập bằng Google
        </Button>
        <Button
          type="primary"
          onClick={handleFacebookLogin}
          className="login-form-button"
          style={{ margin: "10px 0px" }}
          icon={<FacebookFilled />}
        >
          Đăng nhập bằng Facebook
        </Button>
        <Divider />
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên tài khoản"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>

          <a href="" className="login-form-forgot" onClick={(e) => { e.preventDefault(); showModal() }}>
            Quên mật khẩu
          </a>
        </Form.Item>
        {isLoading ? (
          <div className="loading-spinner">
            <Spin size="large" />
          </div>
        ) : null}
        <Form.Item className="button-row">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          <div style={{ margin: "15px 0px", textAlign: "center" }}>Hoặc</div>
          <Button type="dashed" onClick={handleRegisterClick}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <>
        <Modal
          centered
          title="Khôi phục mật khẩu"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={e => handleRecoveryUsername(e)}
          />
        </Modal>
      </>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
