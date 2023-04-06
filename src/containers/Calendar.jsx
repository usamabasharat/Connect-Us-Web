import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Modal, Form, Input, Button, Select
} from 'antd';

const { Option } = Select;

function Calendar() {
  const [events] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [meetings, setMeetings] = useState([]);
  const [info, setInfo] = useState();

  const onFinish = (values) => {
    const { title, attendees } = values;
    console.log('Received values of form: ', values);

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

  return (
    <>
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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotDuration="00:30:00"
        selectable
        editable
        events={events}
        select={handleDateSelect}
        eventDrop={handleEventDrop}
      />
    </>
  );
}

export default Calendar;
