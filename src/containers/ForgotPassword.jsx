/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form, Input,
} from 'antd';
import 'tailwindcss/tailwind.css';

function ForgotPassword() {
  const onFinish = () => {
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Reset Password</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{
              type: 'email', required: true, message: 'Please enter your valid email!',
            }]}
            hasFeedback
          >
            <label className="block text-left text-gray-700 text-sm font-bold mb-4">
              Email
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </label>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
            ]}
            hasFeedback
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
          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            rules={[{ required: true, message: 'Please confirm your password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
            hasFeedback
          >
            <label className="block text-left text-gray-700 text-sm font-bold mb-4">
              Confirm Password
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </label>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-2/4">
                Reset Password
              </Button>
              <p className="text-[#008080] hover:text-[#20b2aa]">Login Now!</p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
