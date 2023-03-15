/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Form,
} from 'antd';
import 'tailwindcss/tailwind.css';
import Textfield from '../shared/TextField';
import {
  VALID_EMAIL_PROMT,
  PASSWORD_REQUIRED_PROMT,
  MIN_PASSWORD_PROMT,
  STRONG_PASSWORD_PROMT,
  PASSWORD_DOESNOT_MATCH_PROMT
} from '../constants/messages';
import { PASSWORD_PATTERN } from '../constants/pattern';

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
          <Textfield
            name="Email"
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMT
              }
            ]}
          />
          <Textfield
            name="Password"
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMT },
              { min: 8, message: MIN_PASSWORD_PROMT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMT
              }
            ]}
          />
          <Textfield
            name="ReEnterPassword"
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMT },
              { min: 8, message: MIN_PASSWORD_PROMT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMT
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('Password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(PASSWORD_DOESNOT_MATCH_PROMT));
                },
              }),
            ]}
          />
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
