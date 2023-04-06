/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  Card, Button, Radio, Checkbox, Input
} from 'antd';
import { useSelector } from 'react-redux';
import { GetDataByType, PostData } from '../API/api';

function Feedback() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useSelector((state) => state.user);

  let userId = 1;
  const meetingId = 1;
  const evaluatedBy = 1;
  const score = 1;
  if (user) userId = user.id;

  const type = 'codereview';

  useEffect(() => {
    async function fetchData() {
      const response = await GetDataByType('questions', type);
      const data = await response.json();
      setQuestions(data);
    }
    fetchData();
  }, []);

  const renderAnswers = (question) => {
    switch (question.answer_type) {
      case 'boolean':
        return (
          <Radio.Group
            options={question.question_answer.answers}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
          />
        );
      case 'options':
        return (
          <Checkbox.Group
            onChange={(checkedValues) => setAnswers({ ...answers, [question.id]: checkedValues })}
          >
            {question.question_answer.answers.map((option) => (
              <Checkbox key={option} value={option}>
                <span style={{ display: 'block' }}>{option}</span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      case 'string':
        return <Input placeholder="Enter Answer" onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} />;
      default:
        return null;
    }
  };

  const onFinish = async () => {
    const feedbackData = questions.map((question) => ({
      question: question.text,
      answer: answers[question.id] || ''
    }));
    const formData = {
      type,
      user_id: userId,
      meeting_id: meetingId,
      evaluated_by: evaluatedBy,
      score,
      json_feedback: {
        feedbackData
      }
    };
    console.log('Received values of form: ', formData);
    const response = await PostData('feedbacks/', formData);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto  border-2 rounded-md p-5 space-y-10 ">
        <h1 className="text-[#008080] text-3xl">Feedback</h1>
        {questions.map((question) => (
          <Card key={question.id} title={question.text}>
            {renderAnswers(question)}
          </Card>
        ))}
        <Button
          onClick={onFinish}
          className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
export default Feedback;
