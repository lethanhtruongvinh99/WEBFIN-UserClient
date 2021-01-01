import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";
import callServer from "../../utils/NetworkUtils";
import showNotification from "../../utils/NotificationUtils";
import { socket } from "../../api";
import { connect } from "react-redux";
import { login } from "../../actions/user-actions";

const mapDispatchToProps = { login };
const mapStateToProps = (state) =>
{
  const { token } = state.user;
  return { token };
};

const RegisterForm = (props) =>
{
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) =>
  {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    if (values.password !== values.passwordConfirm)
    {
      showNotification("error", "Password does not match!");
      return;
    }

    const data = {
      ...values,
      role: 0,
      isCreatedAt: new Date(),
    };

    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/auth/signup",
      "post",
      data
    );
    if (result.auth)
    {
      setIsLoading(false);
      // localStorage.setItem("token", result.accessToken);
      // props.login(result.accessToken);
      // socket.emit("login", { token: result.accessToken });
      // props.history.push("/home");
      showNotification("success", result.message);
    } else
    {
      setIsLoading(false);
      showNotification("error", result.message);
    }
  };

  const handleLoginClick = () =>
  {
    props.history.push("/login");
  };

  return (
    <div className="register-container">
      <h1 style={{ textAlign: "center", margin: "40px 0px", fontSize: "32px" }}>
        Register
      </h1>
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full name"
          />
        </Form.Item>
        <Form.Item
          name="dob"
          rules={[
            {
              required: true,
              message: "Please input your DOB!",
            },
          ]}
        >
          <DatePicker placeholder="Date of birth" />
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
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
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
            className="register-form-button"
          >
            Register
          </Button>

          <div style={{ margin: "15px 0px", textAlign: "center" }}>Or</div>
          <Button type="dashed" onClick={handleLoginClick}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
