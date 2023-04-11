import React from 'react';
import { Button, Form, notification } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import {
  FrownOutlined, SmileOutlined, MailOutlined, LockOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/userSlice';
import Textfield from '../shared/TextField';
import { PASSWORD_PATTERN } from '../constants/pattern';
import {
  VALID_EMAIL_PROMPT,
  PASSWORD_REQUIRED_PROMPT,
  MIN_PASSWORD_PROMPT,
  STRONG_PASSWORD_PROMPT,
  INVALID_PASSWORD,
  EMAIL_DOES_NOT_EXIST,
  LOGIN_SUCCESS
} from '../constants/messages';
import { LoginUser } from '../API/api';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const response = await LoginUser('users/login', values);
    const data = await response.json();
    if (data.user === 'Password does not match') {
      notification.open({
        message: 'Error',
        description: INVALID_PASSWORD,
        icon: <FrownOutlined style={{ color: '#108ee9' }} />
      });
    } else if (data.user === EMAIL_DOES_NOT_EXIST) {
      notification.open({
        message: 'Error',
        description: EMAIL_DOES_NOT_EXIST,
        icon: <FrownOutlined style={{ color: '#108ee9' }} />
      });
    } else {
      dispatch(loginSuccess(data.user));
      notification.open({
        message: 'Success',
        description: LOGIN_SUCCESS,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
      });
      navigate('/calendar');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Log in</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Textfield
            name="email"
            labelText="Email"
            placeholder="Enter your Email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            rules={[
              {
                required: true,
                message: VALID_EMAIL_PROMPT,
              },
            ]}
            type="email"
          />
          <Textfield
            name="password"
            labelText="Password"
            placeholder="Enter your Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
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
