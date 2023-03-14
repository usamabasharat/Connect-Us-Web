/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form, Input,
} from 'antd';
// import { updateUsers } from '../constants/credentials';

function Register() {
//   const temp = { ans: 'pass' };
//   updateUsers(temp);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{
              type: 'email', required: true, message: 'Please input your valid email!',
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
            Or
            {' '}
            <a href="#">Login!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Register;
