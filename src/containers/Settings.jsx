import React from 'react';
import {
  Form, Input, Select, Button
} from 'antd';

function SettingPage() {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-3xl">Settings</h1>
        <Form className="bg-white p-6 rounded-lg shadow-md">
          <Form.Item label="Username" className="mb-4">
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>
          <Form.Item label="Language" className="mb-4">
            <Select className="border-gray-300 rounded-md">
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="es">Spanish</Select.Option>
              <Select.Option value="fr">French</Select.Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-2/4">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SettingPage;
