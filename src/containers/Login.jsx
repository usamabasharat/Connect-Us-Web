/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form, Input,
} from 'antd';

function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Sign in to your account</h1>
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
            rules={[{ required: true, message: 'Please input your Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
            ]}
          >
            <label className="block text-left text-gray-700 text-sm font-bold mb-4">
              Password
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </label>
          </Form.Item>
          <Form.Item className="text-end">
            <a className="login-form-forgot text-md text-[#008080] hover:text-[#20b2aa]" href="#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-1/3">
                Log in
              </Button>
              <a href="#" className="text-[#008080] hover:text-[#20b2aa]">Register Now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
