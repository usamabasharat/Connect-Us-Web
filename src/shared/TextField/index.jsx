import { Form, Input } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

function Textfield({ name, rules, type }) {
  return (
    <Form.Item name={name} rules={rules}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {name}
        <Input
          type={type}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={name}
        />
      </label>
    </Form.Item>
  );
}

export default Textfield;
