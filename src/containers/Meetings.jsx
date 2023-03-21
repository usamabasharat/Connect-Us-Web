import React, { useState } from 'react';
import {
  Modal, Form, Input, DatePicker, Button, Table
} from 'antd';
import './MyRangePicker.css'; // import your custom CSS file
import 'tailwindcss/tailwind.css';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Meeting Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
];

function Meetings() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [meetings, setMeetings] = useState([]);

  const onFinish = (values) => {
    const { title, dateTime } = values;
    const [date, time] = dateTime;

    setMeetings([...meetings, { title, date: date.format('YYYY-MM-DD'), time: time.format('h:mm a') }]);
    setVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div className="p-8">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meetings Scheduler</h1>
        <Button type="primary" className="border-[#008080] bg-[#008080] text-white" onClick={() => setVisible(true)}>Schedule Meeting</Button>
      </div>
      <Table columns={columns} dataSource={meetings} />
      <Modal
        title="Schedule Meeting"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="title" rules={[{ required: true, message: 'Please enter a meeting title!' }]}>
            <Input placeholder="Meeting Title" />
          </Form.Item>
          <Form.Item name="dateTime" rules={[{ required: true, message: 'Please select a date and time!' }]}>
            <RangePicker
              dropdownClassName="custom-range-picker"
              showTime
              format="YYYY-MM-DD h:mm a"
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="mr-2 border-[#008080] bg-[#008080] text-white">Schedule</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Meetings;
