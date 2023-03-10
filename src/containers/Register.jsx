/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  LockOutlined, UserOutlined, FrownOutlined, SmileOutlined,
} from '@ant-design/icons';
import {
  Button, Form, Input, notification,
} from 'antd';
import { updateUsers, credentials } from '../constants/credentials';

/*
  @Register Function
  Registers a new User and validates it.
*/
function Register() {
  const [users, setUsers] = useState(credentials);

  const onFinish = (values) => {
    if (values.password === values.password1) {
      let hasMatch = false;
      for (let i = 0; i < credentials.length; i += 1) {
        if (credentials[i].email === values.email) {
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        const newUser = { email: values.email, password: values.password };
        setUsers(...users, newUser);
        updateUsers(newUser);
        notification.open({
          message: 'Success',
          description:
            'User SignedUp Successfuly.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      } else {
        notification.open({
          message: 'Error',
          description:
          'Email Already exist.',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
      }
    } else {
      notification.open({
        message: 'Error',
        description:
          'Both password do not match.',
        icon: <FrownOutlined style={{ color: '#108ee9' }} />,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl font-bold mb-8">SignUp</h1>
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
          <Form.Item
            name="password1"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Re-Password"
            />
          </Form.Item>
          <Form.Item className="text-end">
            <a className="login-form-forgot text-md text-[#008080] hover:text-[#20b2aa]" href="#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-1/3">
                Sign up
              </Button>
              <a href="#" className="text-[#008080] hover:text-[#20b2aa]">Already a user Sign in</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
