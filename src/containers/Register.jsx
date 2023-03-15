import React, { useState } from 'react';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Form, notification } from 'antd';
import { updateUsers, credentials } from '../constants/credentials';
import Textfield from '../shared/TextField';
import { NUMBER_PATTERN, PASSWORD_PATTERN } from '../constants/pattern';
import {
  FIRST_NAME_PROMPT,
  LAST_NAME_PROMPT,
  VALID_NUMBER_PROMT,
  VALID_EMAIL_PROMT,
  PASSWORD_REQUIRED_PROMT,
  MIN_PASSWORD_PROMT,
  STRONG_PASSWORD_PROMT,
} from '../constants/messages';
import {
  SIGNUP_SUCCESS,
  SINGUP_FAIL_EMAIL,
  SINGUP_FAIL_PASSWORD
} from '../constants/notifications';

/*
  @Register Function
  Registers a new User and validates it.
*/
function Register() {
  const [users, setUsers] = useState(credentials);

  const onFinish = (values) => {
    if (values.Password === values.ReEnterPassword) {
      let hasMatch = false;
      for (let i = 0; i < credentials.length; i += 1) {
        if (credentials[i].email === values.Email) {
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        const newUser = { email: values.Email, password: values.Password };
        setUsers(...users, newUser);
        updateUsers(newUser);
        notification.open({
          message: 'Success',
          description: SIGNUP_SUCCESS,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />
        });
      } else {
        notification.open({
          message: 'Error',
          description: SINGUP_FAIL_EMAIL,
          icon: <FrownOutlined style={{ color: '#108ee9' }} />
        });
      }
    } else {
      notification.open({
        message: 'Error',
        description: SINGUP_FAIL_PASSWORD,
        icon: <FrownOutlined style={{ color: '#108ee9' }} />
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
          <Textfield
            name="FirstName"
            rules={[
              {
                required: true,
                message: FIRST_NAME_PROMPT
              }
            ]}
            type="text"
          />
          <Textfield
            name="LastName"
            rules={[
              {
                required: true,
                message: LAST_NAME_PROMPT
              }
            ]}
            type="text"
          />
          <Textfield
            name="Number"
            rules={[
              {
                required: true,
                message: VALID_NUMBER_PROMT,
                pattern: NUMBER_PATTERN
              }
            ]}
            type="text"
          />
          <Textfield
            name="Email"
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMT
              }
            ]}
            type="email"
          />
          <Textfield
            name="Password"
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMT },
              { min: 8, message: MIN_PASSWORD_PROMT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMT
              }
            ]}
            type="password"
          />
          <Textfield
            name="ReEnterPassword"
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMT },
              { min: 8, message: MIN_PASSWORD_PROMT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMT
              }
            ]}
            type="password"
          />
          <Form.Item>
            <div className="flex justify-between">
              <Button
                htmlType="submit"
                className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-1/3"
              >
                Sign up
              </Button>
              <div href="#" className="text-[#008080] hover:text-[#20b2aa]">
                Already a user Sign in
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Register;
