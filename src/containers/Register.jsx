import React, { useState } from 'react';
import {
  FrownOutlined, SmileOutlined, LockOutlined, UserOutlined, PhoneOutlined, MailOutlined
} from '@ant-design/icons';
import {
  Button, Form, notification, Select
} from 'antd';

import { Link } from 'react-router-dom';
import { updateUsers, credentials } from '../constants/credentials';
import Textfield from '../shared/TextField';
import { NUMBER_PATTERN, PASSWORD_PATTERN } from '../constants/pattern';
import {
  FIRST_NAME_PROMPT,
  LAST_NAME_PROMPT,
  VALID_NUMBER_PROMPT,
  VALID_EMAIL_PROMPT,
  PASSWORD_REQUIRED_PROMPT,
  MIN_PASSWORD_PROMPT,
  STRONG_PASSWORD_PROMPT,
} from '../constants/messages';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL_EMAIL,
  SIGNUP_FAIL_PASSWORD
} from '../constants/notifications';
import { PostData } from '../API/api';

const { Option } = Select;

/*
  @Register Function
  Registers a new User and validates it.
*/
function Register() {
  const [users, setUsers] = useState(credentials);

  const onFinish = async (values) => {
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
        console.log(`Values: ${JSON.stringify(values)}`);
        const response = await PostData('users/', values);
        const data = await response.json();
        console.log(data);
        notification.open({
          message: 'Success',
          description: SIGNUP_SUCCESS,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />
        });
      } else {
        notification.open({
          message: 'Error',
          description: SIGNUP_FAIL_EMAIL,
          icon: <FrownOutlined style={{ color: '#108ee9' }} />
        });
      }
    } else {
      notification.open({
        message: 'Error',
        description: SIGNUP_FAIL_PASSWORD,
        icon: <FrownOutlined style={{ color: '#108ee9' }} />
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl font-bold">SignUp</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Textfield
            name="first_name"
            labelText="First Name"
            placeholder="Enter your First Name"
            rules={[
              {
                required: true,
                message: FIRST_NAME_PROMPT
              }
            ]}
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          <Textfield
            name="last_name"
            labelText="Last Name"
            placeholder="Enter your Last Name"
            rules={[
              {
                required: true,
                message: LAST_NAME_PROMPT
              }
            ]}
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          <Textfield
            name="phone"
            labelText="Phone Number"
            placeholder="Enter your Phone Number"
            rules={[
              {
                required: true,
                message: VALID_NUMBER_PROMPT,
                pattern: NUMBER_PATTERN
              }
            ]}
            type="text"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
          />
          <Textfield
            name="email"
            labelText="Email"
            placeholder="Enter your Email"
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMPT
              }
            ]}
            type="email"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
          <Textfield
            name="password"
            labelText="Password"
            placeholder="Enter Password"
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMPT },
              { min: 8, message: MIN_PASSWORD_PROMPT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMPT
              }
            ]}
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          <Textfield
            name="confirm_password"
            labelText="Confirm Password"
            placeholder="Enter Confirm Password"
            rules={[
              { required: true, message: PASSWORD_REQUIRED_PROMPT },
              { min: 8, message: MIN_PASSWORD_PROMPT },
              {
                pattern: PASSWORD_PATTERN,
                message: STRONG_PASSWORD_PROMPT
              }
            ]}
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please select your role!',
              },
            ]}
          >
            <Select placeholder="Select your role">
              <Option value="admin">Admin</Option>
              <Option value="superadmin">Super Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              {
                required: true,
                message: 'Please select your designation!',
              },
            ]}
          >
            <Select placeholder="Select your designation">
              <Option value="ase">ASE</Option>
              <Option value="se">SE</Option>
              <Option value="sse">SSE</Option>
              <Option value="atl">ATL</Option>
              <Option value="tl">TL</Option>
              <Option value="apm">APM</Option>
              <Option value="pm">PM</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button
                htmlType="submit"
                className="w-1/3 login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
              >
                Sign up
              </Button>
              <Link to="/login" className="text-[#008080] hover:text-[#20b2aa]">
                Already a user Sign in
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Register;
