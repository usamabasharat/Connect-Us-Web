import React from 'react';
import {
  Form, Radio, Select, Input, Button
} from 'antd';
import feedbackData from '../constants/feedbackdata';

function Feedback() {
  const [form] = Form.useForm();
  const onFinish = (formData) => {
    console.log('Received values of form: ', formData);
  };

  const renderField = (field) => {
    switch (field.feedback_type) {
      case 'text_field':
        return (
          <Form.Item key={field.title} name={field.title} label={field.title}>
            <Input />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item key={field.title} name={field.title} label={field.title}>
            <Radio.Group>
              {field.options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item key={field.title} name={field.title} label={field.title}>
            <Select>
              {field.options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <Form form={form} onFinish={onFinish}>
          {feedbackData.map((feedback) => renderField(feedback))}
          <Button type="primary" htmlType="submit" className="bg-black">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default Feedback;
