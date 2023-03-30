import React from 'react';
import { Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import Textfield from '../shared/TextField';
import { PASSWORD_PATTERN } from '../constants/pattern';
import {
  VALID_EMAIL_PROMPT,
  PASSWORD_REQUIRED_PROMPT,
  MIN_PASSWORD_PROMPT,
  STRONG_PASSWORD_PROMPT,
} from '../constants/messages';
import GetData from '../apis/api';

function Login() {
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const response = await GetData('users/');
    const data = await response.json();
    console.log(data);
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
          <Textfield
            name="Email"
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMPT,
              },
            ]}
            type="email"
          />
          <Textfield
            name="Password"
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMPT },
              { min: 8, message: MIN_PASSWORD_PROMPT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMPT,
              },
            ]}
            type="password"
          />
          <Form.Item className="text-end">
            <Link to="/forgotpassword" className="login-form-forgot text-md text-[#008080] hover:text-[#20b2aa]">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button
                htmlType="submit"
                className="w-1/3 login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
              >
                Log in
              </Button>
              <Link to="/register" className="text-[#008080] hover:text-[#20b2aa]">
                Register Now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
