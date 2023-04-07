import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Modal, Form, Input, Button, Select
} from 'antd';
import { GetData } from '../API/api';

const { Option } = Select;

function Calendar() {
  const [events] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [meetings, setMeetings] = useState([]);
  const [info, setInfo] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await GetData('users');
      setUsers(response);
    }
    fetchData();
  }, []);

  const onFinish = (values) => {
    const { title, attendees } = values;

    setMeetings({ title, attendees });
    setVisible(false);
    form.resetFields();

    const calendarApi = info.view.calendar;
    calendarApi.unselect();

    if (meetings) {
      calendarApi.addEvent({
        title,
        attendees,
        start: info.startStr,
        end: info.endStr,
        allDay: info.allDay,
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleDateSelect = (selectInfo) => {
    setVisible(true);
    setInfo(selectInfo);
  };

  const handleEventDrop = (dropInfo) => {
    const calendarApi = dropInfo.view.calendar;
    const event = calendarApi.getEventById(dropInfo.event.id);
    const { start } = dropInfo.event;
    const { end } = dropInfo.event;

    calendarApi.unselect(); // clear date selection

    if (event) {
      event.setDates(start, end);
    }
  };
  const handleEventClick = (clickInfo) => {
    clickInfo.event.remove();
  };

  return (
    <>
      <div className="flex flex-row h-screen bg-white">
        <div className="w-3/4 justify-center">
          <FullCalendar
            className="flex w-3/4 justify-center"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="timeGridWeek"
            slotDuration="00:30:00"
            selectable
            editable
            events={events}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
          />
        </div>
        <div className="flex w-1/4 justify-center mt-8">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium">Meeting with John Doe</h3>
                <p className="text-gray-500 text-sm mt-1">Wednesday, March 23, 2023 at 10:00 AM</p>
              </div>
              <div className="p-4 flex justify-end">
                <Button className="mr-2">Accept</Button>
                <Button className="mr-2">Reject</Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium">Meeting with Jane Doe</h3>
                <p className="text-gray-500 text-sm mt-1">Thursday, March 24, 2023 at 2:00 PM</p>
              </div>
              <div className="p-4 flex justify-end">
                <Button className="mr-2">Accept</Button>
                <Button className="mr-2">Reject</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <Form.Item name="description" rules={[{ required: true, message: 'Please enter a meeting Description!' }]}>
            <Input placeholder="Meeting Description" />
          </Form.Item>
          <Form.Item name="meeting_type" rules={[{ required: true, message: 'Please select type!' }]}>
            <Select mode="tags" placeholder="Meeting Type">
              <Option value="mock">Mock</Option>
              <Option value="codereview">Code Review</Option>
              <Option value="one">One</Option>
              <Option value="annual">Annaul</Option>
              <Option value="biannual">Biannual</Option>
              <Option value="quarterly">quarterly</Option>
            </Select>
          </Form.Item>
          <Form.Item name="attendees" rules={[{ required: true, message: 'Please select at least one attendee!' }]}>
            <Select mode="tags" placeholder="Attendees">
              {users.map((user) => (
                <Option key={user.id} value={user.first_name}>{`${user.first_name} ${user.last_name}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                type: 'url',
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input />
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
    </>
  );
}

export default Calendar;
