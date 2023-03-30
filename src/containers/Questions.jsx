import React, { useState } from 'react';
import {
  Form, Radio, Checkbox, Button, Select, Input
} from 'antd';
import Textfield from '../shared/TextField';
import { QUESTION_REQUIRED } from '../constants/messages';

function Questions() {
  const [form] = Form.useForm();
  const [type, setType] = useState('check');
  const [newOption, setNewOption] = useState();
  const [questionsArray, setQuestionArray] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
  ]);

  const handleSubmit = (values) => {
    console.log(values);
    form.resetFields();
  };
  const handleChange = (value) => {
    setType(value);
  };
  const changeHandler = (event) => {
    setNewOption(event.target.value);
  };
  const addOption = () => {
    setQuestionArray([...questionsArray, newOption]);
    setNewOption('');
  };

  let Options;
  if (type === 'radio') {
    Options = questionsArray.map((option) => (
      <Radio className="block h-[30px]" key={questionsArray.indexOf(option)} value={option}>
        {option}
      </Radio>
    ));
  } else if (type === 'check') {
    Options = questionsArray.map((option) => (
      <Checkbox key={questionsArray.indexOf(option)} className="ml-2 h-[30px]" value={option}>
        {option}
      </Checkbox>
    ));
  } else {
    Options = questionsArray.map((option) => (
      <Select.Option className="ml-2 h-[30px]" key={questionsArray.indexOf(option)} value={option}>
        {option}
      </Select.Option>
    ));
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Form form={form} onFinish={handleSubmit}>
        <Textfield
          name="Question"
          rules={[{ required: true, message: QUESTION_REQUIRED }]}
          type="text"
        />
        <Form.Item label="Answer Type" rules={[{ required: true }]}>
          <Select
            className="mb-5 w-max"
            defaultValue="check"
            onChange={handleChange}
          >
            <Select.Option value="check">Checkbox</Select.Option>
            <Select.Option value="radio">Radio Button</Select.Option>
            <Select.Option value="select">Select</Select.Option>
          </Select>
        </Form.Item>
        {type === 'radio' && (
        <Form.Item className="text-left" name="Options" label="Options" rules={[{ required: true }]}>
          <Radio.Group>{Options}</Radio.Group>
        </Form.Item>
        )}
        {type === 'check' && (
          <Form.Item className="text-left" name="Options" label="Options" rules={[{ required: true }]}>
            <Checkbox.Group className="flex-col">{Options}</Checkbox.Group>
          </Form.Item>
        )}
        {type === 'select' && (
          <Form.Item className="text-left" name="Options" label="Options" rules={[{ required: true }]}>
            <Select
              className="mb-5 w-max"
            >
              {Options}
            </Select>
          </Form.Item>
        )}

        <div className="mb-16 flex">
          <Input className="w-3/4" value={newOption} onChange={changeHandler} />
          <Button
            onClick={addOption}
            className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
          >
            Add Answer
          </Button>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
          >
            Add Question
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Questions;
