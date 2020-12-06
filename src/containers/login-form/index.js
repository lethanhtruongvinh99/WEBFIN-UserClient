import React from 'react';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import { callServer } from '../../utils/NetworkUtils';
import showNotification from '../../utils/NotificationUtils';
import './index.css';

const LoginForm = (props) =>
{
    const onFinish = async (values) =>
    {
        console.log('Received values of form: ', values);
        const data = {
            ...values
        }

        const result = await callServer(process.env.REACT_APP_HOST_NAME + '/auth/login', 'post', data);
        if (result.auth)
        {
            localStorage.setItem('token', result.accessToken);
            props.history.push('/home');

        }
        else
        {
            showNotification('error', result.message);
        }

    };

    const handleRegisterClick = () =>
    {
        props.history.push('/register');
    }

    return (
        <div className="login-container">
            <h1 style={{ textAlign: 'center', margin: '40px 0px', fontSize: '32px' }}>Login</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Button type="primary" danger className="login-form-button" style={{ margin: '10px 0px' }} icon={<GoogleCircleFilled />}>Log in with Google</Button>
                <Button type="primary" className="login-form-button" style={{ margin: '10px 0px' }} icon={<FacebookFilled />}>Log in with Facebook</Button>
                <Divider />
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
        </a>
                </Form.Item>

                <Form.Item className="button-row">
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    <div style={{ margin: '15px 0px', textAlign: 'center' }}>Or</div>
                    <Button type="dashed" onClick={handleRegisterClick}>Register</Button>
                </Form.Item>
            </Form>
        </div>

    );

}


export default LoginForm;