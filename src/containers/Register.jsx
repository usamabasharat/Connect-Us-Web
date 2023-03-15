import React, { useState } from 'react';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Form, notification } from 'antd';
import { updateUsers, credentials } from '../constants/credentials';
import Textfield from '../shared/TextField';

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
          description: 'User SignedUp Successfuly.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />
        });
      } else {
        notification.open({
          message: 'Error',
          description: 'Email Already exist.',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />
        });
      }
    } else {
      notification.open({
        message: 'Error',
        description: 'Both password do not match.',
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
            name="First Name"
            rules={[
              {
                type: 'text',
                required: true,
                message: 'Please input your First Name!'
              }
            ]}
            type="text"
          />
          <Textfield
            name="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your First Name!'
              }
            ]}
            type="text"
          />
          <Textfield
            name="Number"
            rules={[
              {
                required: true,
                message: 'Please input a valid number!',
                pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
              }
            ]}
            type="text"
          />
          <Textfield
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input your valid email!'
              }
            ]}
            type="email"
          />
          <Textfield
            name="Password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
              {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!#@$%\-_=+<>]+)$/,
                message: 'Password not strong enough!'
              }
            ]}
            type="password"
          />
          <Textfield
            name="Re-Enter Password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 8, message: 'Password must be minimum 8 characters.' },
              {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!#@$%\-_=+<>]+)$/,
                message: 'Password not strong enough!'
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
