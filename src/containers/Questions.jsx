import React, { useState } from 'react';
import { Form, Button } from 'antd';
import Textfield from '../shared/TextField';
import { QUESTION_REQUIRED } from '../constants/messages';

function Questions() {
  const [questions, setQuestions] = useState([]);

  const onFinish = (values) => {
    setQuestions([...questions, values.Question]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions for Meeting</h1>
      <Form onFinish={onFinish}>
        <Textfield
          name="Question"
          rules={[
            { required: true, message: QUESTION_REQUIRED },
          ]}
          type="text"
        />
        <Form.Item>
          <Button
            htmlType="submit"
            className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20b2aa] hover:text-white w-1/3"
          >
            Add Question
          </Button>
        </Form.Item>
      </Form>
      <div className="mt-4">
        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul>
            {questions.map((question, thing) => (
              <li key={thing.id}>{question}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Questions;
