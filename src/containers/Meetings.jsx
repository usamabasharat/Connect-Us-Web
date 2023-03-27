import React, { useState } from 'react';
import {
  Modal, Form, Input, DatePicker, Button, Table, Select
} from 'antd';
import './MyRangePicker.css'; // import your custom CSS file
import 'tailwindcss/tailwind.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: 'Attendees',
    dataIndex: 'attendees',
    key: 'attendees',
    render: (attendees) => <span>{attendees.join(', ')}</span>,
  },
];

function Meetings() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [meetings, setMeetings] = useState([]);

  const onFinish = (values) => {
    const { title, dateTime, attendees } = values;
    const [start, end] = dateTime;

    setMeetings([...meetings, {
      title, date: start.format('YYYY-MM-DD'), start_time: start.format('h:mm a'), end_time: end.format('h:mm a'), attendees
    }]);
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
        <Button
          htmlType="submit"
          className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
          onClick={() => setVisible(true)}
        >
          Schedule Meeting

        </Button>
      </div>
      <Table columns={columns} dataSource={meetings} />
      <Modal
        title="Schedule Meeting"
        open={visible}
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
              showTime={{ format: 'h:mm a' }}
              format="YYYY-MM-DD h:mm a"
            />
          </Form.Item>
          <Form.Item name="attendees" rules={[{ required: true, message: 'Please select at least one attendee!' }]}>
            <Select mode="tags" placeholder="Attendees">
              <Option value="John">John</Option>
              <Option value="Jane">Jane</Option>
              <Option value="Doe">Doe</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              htmlType="submit"
              className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
            >
              Schedule

            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Meetings;
