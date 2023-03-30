import React from 'react';
import {
  Button, Checkbox, Form, Select
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function Settings() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Settings</h1>
        <Form
          name="settings-form"
          onFinish={onFinish}
          initialValues={{
            emailNotifications: true,
            timezone: 'EST',
            startOfWeek: 'Sunday',
          }}
          layout="vertical"
        >
          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
            className="flex items-center"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            name="timezone"
            label="Timezone"
            rules={[
              {
                required: true,
                message: 'Please select your timezone',
              },
            ]}
          >
            <Select>
              <Option value="EST">Eastern Standard Time (EST)</Option>
              <Option value="CST">Central Standard Time (CST)</Option>
              <Option value="MST">Mountain Standard Time (MST)</Option>
              <Option value="PST">Pacific Standard Time (PST)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="startOfWeek"
            label="Start of Week"
            rules={[
              {
                required: true,
                message: 'Please select the day your week starts on',
              },
            ]}
          >
            <Select>
              <Option value="Sunday">Sunday</Option>
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-500 hover:bg-green-600 text-white mr-2"
              icon={<CheckOutlined />}
            >
              Save
            </Button>
            <Button
              type="primary"
              className="bg-red-500 hover:bg-red-600 text-white"
              icon={<CloseOutlined />}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Settings;
