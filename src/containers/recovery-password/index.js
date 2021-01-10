import { React, useState } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import showNotification from "../../utils/NotificationUtils";
import callServer from "../../utils/NetworkUtils";
import { useHistory } from 'react-router';
const RecoveryPassword = () =>
{
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const hashUsername = history.location.search.split("?")[1];
  const handleLoginBtn = () =>
  {
    history.push('/login');
  }
  const onFinish = async (values) =>
  {
    //console.log(values);
    setIsSuccess(false);
    if (values.password !== values.repassword)
    {
      showNotification('error', "Re-password is not correct!");
    } else
    {
      const data = { password: values.password, hashUsername: hashUsername };
      const result = await callServer(process.env.REACT_APP_HOST_NAME + "/auth/recovery",
        "post", data);
      if (result.auth)
      {
        setIsSuccess(true);
        showNotification('success', result.message);
      } else
      {
        showNotification('error', result.message);
      }
    }
  };
  return (
    <div>
      {!isSuccess ? (<Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
          name="repassword"
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
            placeholder="Retype password"
          />
        </Form.Item>
        <Form.Item className="button-row">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>) : (<Button type="primary" onClick={() => { handleLoginBtn() }}>Login</Button>)}

    </div>
  );
};

export default RecoveryPassword;
