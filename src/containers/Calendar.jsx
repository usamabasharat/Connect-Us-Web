import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Modal, Form, Input, Button, Select
} from 'antd';
import { useSelector } from 'react-redux';
import { GetData, PostData, GetDataByID } from '../API/api';
import Notification from '../components/Notification';

const { Option } = Select;

function Calendar() {
  const { user } = useSelector((state) => state.user);
  const Id = user.id;
  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [newMeetings, setMeetings] = useState([]);
  const [info, setInfo] = useState();
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    const calendarApi = info.view.calendar;
    const { title, attendees } = values;
    const fromTime = new Date(info.startStr);
    const from = fromTime.getTime();
    const toTime = new Date(info.endStr);
    const to = toTime.getTime();
    const meetingData = ({
      ...values,
      from,
      to,
      user_id: Id
    });
    const response = await PostData('meetings/', meetingData);
    const data = await response.json();
    if (data.message === 'Meeting Created Successfully') {
      Notification(true, data.message);
    } else {
      Notification(false, data.error.details[0].message);
    }
    setMeetings({ title, attendees });
    setVisible(false);
    form.resetFields();

    calendarApi.unselect();

    if (newMeetings) {
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
    setIsModalVisible(false);
    setVisible(false);
    form.resetFields();
  };

  const handleDateSelect = (selectInfo) => {
    setVisible(true);
    setInfo(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    setIsModalVisible(true);
    console.dir(clickInfo);
    setSingleEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
    });
    // clickInfo.event.remove();
    // @TODO
    // Designa a Modal here to confirm/reject meetings.
  };

  const mapMeetings = async (data) => {
    data.forEach(async (meeting) => {
      const { title } = meeting.meetings;
      const fromTime = new Date(meeting.from);
      const from = fromTime.getTime();
      const toTime = new Date(meeting.to);
      const to = toTime.getTime();

      setEvents((previous) => [...previous, {
        title,
        start: from,
        end: to,
        allDay: false,
      }]);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await GetData('users');
      setUsers(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMeetings() {
      const meetings = await GetDataByID('meetings', Id);
      const allMeetings = await meetings.json();
      setMeetings(allMeetings);
      mapMeetings(allMeetings);
    }
    fetchMeetings();
  }, []);

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
            eventClick={handleEventClick}
          />
        </div>
        <div className="flex w-1/4 justify-center mt-8">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
            {newMeetings.map((meeting) => {
              const startDateTime = new Date(meeting.meetings.scheduled_slots[0].from);
              const startDate = startDateTime.toLocaleDateString('en-US', { weekday: 'long' });
              const startTime = startDateTime.toLocaleTimeString('en-US');

              const endDateTime = new Date(meeting.meetings.scheduled_slots[0].to);
              const endDate = endDateTime.toLocaleDateString('en-US', { weekday: 'long' });
              const endTime = endDateTime.toLocaleTimeString('en-US');

              return (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium">{meeting.meetings.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Start:
                      {' '}
                      {startDate}
                      {' '}
                      at
                      {' '}
                      {startTime}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      End:
                      {' '}
                      {endDate}
                      {' '}
                      at
                      {' '}
                      {endTime}
                    </p>
                  </div>
                  <div className="p-4 flex justify-end">
                    <Button className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]">
                      Accept

                    </Button>
                    <Button className="ml-2 login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]">
                      Reject

                    </Button>
                  </div>
                </div>
              );
            })}
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
          <Form.Item name="type" rules={[{ required: true, message: 'Please select type!' }]}>
            <Select placeholder="Meeting Type">
              <Option value="mock">Mock</Option>
              <Option value="codereview">Code Review</Option>
              <Option value="one">One</Option>
              <Option value="annual">Annual</Option>
              <Option value="biannual">Biannual</Option>
              <Option value="quarterly">Quarterly</Option>
            </Select>
          </Form.Item>
          <Form.Item name="attendees" rules={[{ required: true, message: 'Please select at least one attendee!' }]}>
            <Select mode="tags" placeholder="Attendees">
              {users.map((data) => (
                <Option key={data.id} value={data.id}>{`${data.first_name} ${data.last_name}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="optional" rules={[{ required: true, message: 'Please select at least one attendee!' }]}>
            <Select mode="tags" placeholder="Optional">
              {users.map((data) => (
                <Option key={data.id} value={data.id}>{`${data.first_name} ${data.last_name}`}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input placeholder="URL" />
          </Form.Item>
          <Form.Item
            name="attachments"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Please enter a valid Attachment',
              },
            ]}
          >
            <Input placeholder="Attachments" />
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
      <Modal
        title={singleEvent && singleEvent.title}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="accept">
            Accept
          </Button>,
          <Button key="reject" type="danger">
            Reject
          </Button>,
        ]}
      >
        <p>
          Start Time:
          {' '}
          {singleEvent && singleEvent.start.toString()}
        </p>
        <p>
          End Time:
          {' '}
          {singleEvent && singleEvent.end.toString()}
        </p>
      </Modal>
      ;
    </>
  );
}

export default Calendar;
