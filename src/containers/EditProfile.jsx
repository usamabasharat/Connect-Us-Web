/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form, Input,
} from 'antd';

function EditProfile() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Edit Profile</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{
              required: true, message: 'Please input your Full Name.',
            }]}
          >
            <label className="block text-left text-gray-700 text-sm font-bold mb-4">
              Full Name
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
            </label>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
              {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!#@$%\-_=+<>]+)$/,
                message: 'Password Pattern',
              },
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
          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            rules={[{ required: true, message: 'Please input your Confirm Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
            ]}
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
          <Form.Item
            name="generic_slots"
            rules={[{ required: true, message: '' },
            ]}
          >
            <label className="block text-left text-gray-700 text-sm font-bold mb-4">
              Generic Slots
            </label>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-2/">
                Save Changes
              </Button>
              <a href="#" className="text-[#008080] hover:text-[#20b2aa]">Cancel</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default EditProfile;
