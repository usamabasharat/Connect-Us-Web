import React from 'react';
import { useSelector } from 'react-redux';
import {
  LockOutlined, PhoneOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Button, Form, Select
} from 'antd';
import { Link } from 'react-router-dom';
import Textfield from '../shared/TextField';
import {
  FIRST_NAME_PROMPT, LAST_NAME_PROMPT,
  MIN_PASSWORD_PROMPT, PASSWORD_REQUIRED_PROMPT,
  STRONG_PASSWORD_PROMPT,
  USER_UPDATED,
  VALID_NUMBER_PROMPT,
} from '../constants/messages';
import { NUMBER_PATTERN, PASSWORD_PATTERN } from '../constants/pattern';
import { PutData } from '../API/api';
import Notification from '../components/Notification';

function EditProfile() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const linkValue = true;
  const { user } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    const Id = user.id;
    const response = await PutData(`users/${Id}`, values);
    const data = await response.json();
    console.log(data);
    if (data.message !== 'Invalid Body') {
      Notification(true, USER_UPDATED);
    } else {
      Notification(false, data.error.details[0].message);
    }
    form.resetFields();
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Edit Profile</h1>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Textfield
            name="first_name"
            type="name"
            labelText="First Name"
            placeholder="Enter your First Name"
            defaultValue={user.first_name}
            prefix={<UserOutlined className="site-form-item-icon" />}
            rules={[{
              required: true, message: FIRST_NAME_PROMPT,
            }]}
          />
          <Textfield
            name="last_name"
            type="name"
            labelText="Last Name"
            placeholder="Enter your Last Name"
            defaultValue={user.last_name}
            prefix={<UserOutlined className="site-form-item-icon" />}
            rules={[{
              required: true, message: LAST_NAME_PROMPT,
            }]}
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
            name="phone"
            labelText="Phone Number"
            placeholder="Enter your Phone Number"
            defaultValue={user.phone}
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
          <label htmlFor="Designation" className="block text-left text-gray-700 text-sm font-bold mb-4">
            Designation
            <Form.Item
              name="designation"
              rules={[
                {
                  required: true,
                  message: 'Please select your designation!',
                },
              ]}
            >
              <Select placeholder="Select your designation" defaultValue={user.designation}>
                <Option value="ase">ASE</Option>
                <Option value="se">SE</Option>
                <Option value="sse">SSE</Option>
                <Option value="atl">ATL</Option>
                <Option value="tl">TL</Option>
                <Option value="apm">APM</Option>
                <Option value="pm">PM</Option>
              </Select>
            </Form.Item>
          </label>
          <div className="flex">
            <Link to="/genericSlots" state={linkValue} className="text-[#008080] hover:text-[#20b2aa] justify-start mb-3">
              Edit Generic Slots
            </Link>
          </div>
          <Form.Item>
            <div className="flex justify-between">
              <Button
                htmlType="submit"
                className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
              >
                Save Changes
              </Button>
              <p className="text-[#008080] hover:text-[#20b2aa] mt-3">Cancel</p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default EditProfile;
