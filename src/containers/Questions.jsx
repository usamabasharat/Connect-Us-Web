import React, { useState } from 'react';
import {
  Form, Radio, Checkbox, Button, Select, Input, notification
} from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import Textfield from '../shared/TextField';
import { QUESTION_ADDED, QUESTION_REQUIRED, TEXT_REQUIRED } from '../constants/messages';
import { PostData } from '../API/api';

function Questions() {
  const [form] = Form.useForm();
  const [answerType, setAnswerType] = useState('check');
  const [type, setQuestionType] = useState('');
  const [newOption, setNewOption] = useState();
  const [answersArray, setAnswerArray] = useState([]);

  const handleSubmit = async (values) => {
    const createdBy = 4;
    if (typeof values.Options === 'string') {
      answersArray.push(values.Options);
    }
    const question = {
      ...values,
      answersArray,
      type,
      answerType,
      createdBy,
    };
    const response = await PostData('questions/', question);
    const data = await response.json();
    if (response.status === 200) {
      notification.open({
        message: 'Success',
        description: QUESTION_ADDED,
        icon: <SmileOutlined style={{ color: '#108EE9' }} />
      });
    } else {
      notification.open({
        message: 'Error',
        description: data.message,
        icon: <FrownOutlined style={{ color: '#108EE9' }} />
      });
    }
    form.resetFields();
    setAnswerArray([]);
  };
  const handleChange = (value) => {
    setAnswerType(value);
  };
  const changeHandler = (event) => {
    setNewOption(event.target.value);
  };
  const handleQuestionChange = (value) => {
    setQuestionType(value);
  };
  const addOption = () => {
    setAnswerArray([...answersArray, newOption]);
    setNewOption('');
  };

  let Options;
  if (answerType === 'boolean') {
    Options = answersArray.map((option) => (
      <Radio className="block h-[30px]" key={answersArray.indexOf(option)} value={option}>
        {option}
      </Radio>
    ));
  } else if (answerType === 'options') {
    Options = answersArray.map((option) => (
      <Checkbox key={answersArray.indexOf(option)} className="ml-2 h-[30px]" value={option}>
        {option}
      </Checkbox>
    ));
  } else {
    Options = answersArray.map((option) => (
      <Select.Option className="ml-2 h-[30px]" key={answersArray.indexOf(option)} value={option}>
        {option}
      </Select.Option>
    ));
  }

  return (
    <div className="py-60 max-w-3xl mx-auto">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="Question Type" rules={[{ required: true }]}>
          <Select
            className="mb-5 w-max"
            defaultValue=""
            onChange={handleQuestionChange}
          >
            <Select.Option value="mock">Mock</Select.Option>
            <Select.Option value="codereview">Code Review</Select.Option>
            <Select.Option value="one">One on One</Select.Option>
            <Select.Option value="annual">Annual Review</Select.Option>
            <Select.Option value="biannual">Biannual Review</Select.Option>
            <Select.Option value="quarterly">Quarterly Review</Select.Option>
          </Select>
        </Form.Item>
        <Textfield
          name="text"
          labelText="Question"
          placeholder="Question"
          rules={[{ required: true, message: QUESTION_REQUIRED }]}
          type="text"
        />
        <Form.Item label="Answer Type" rules={[{ required: true }]}>
          <Select
            className="mb-5 w-max"
            defaultValue=""
            onChange={handleChange}
          >
            <Select.Option value="options">Checkbox</Select.Option>
            <Select.Option value="boolean">Radio Button</Select.Option>
            <Select.Option value="numeric">Select</Select.Option>
            <Select.Option value="string">Text</Select.Option>
          </Select>
        </Form.Item>
        {answerType === 'boolean' && (
        <Form.Item className="text-left" name="Options" label="Options">
          <Radio.Group>{Options}</Radio.Group>
        </Form.Item>
        )}
        {answerType === 'options' && (
          <Form.Item className="text-left" name="Options" label="Options">
            <Checkbox.Group className="flex-col">{Options}</Checkbox.Group>
          </Form.Item>
        )}
        {answerType === 'numeric' && (
          <Form.Item className="text-left" name="Options" label="Options">
            <Select
              className="mb-5 w-max"
            >
              {Options}
            </Select>
          </Form.Item>
        )}
        {answerType === 'string' && (
          <Textfield
            name="Options"
            labelText="Answer"
            placeholder="Answer"
            rules={[{ required: true, message: TEXT_REQUIRED }]}
            type="text"
          />
        )}
        {answerType !== 'string' && (
        <div className="mb-16 flex">
          <div className="w-full">
            <label htmlFor="add option" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Add a Option
              <Input className="w-full" value={newOption} onChange={changeHandler} placeholder="Add Option" />
            </label>
          </div>
          <Button
            onClick={addOption}
            className="mt-5 text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
          >
            Add Answer
          </Button>
        </div>
        )}
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
