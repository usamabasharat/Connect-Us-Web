import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, DatePicker, Button, notification, Table
} from 'antd';
import { FileTextOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { EXCEPTION_SLOT_ADDED, VALID_REASON, VALID_TIME } from '../constants/messages';
import './MyRangePicker.css';
import { GetData, PostData } from '../API/api';
import Textfield from '../shared/TextField';

function ExceptionSlots() {
  const { RangePicker } = DatePicker;
  const { user } = useSelector((state) => state.user);
  const [exceptionSlots, setExceptionSlots] = useState();
  const [form] = Form.useForm();
  const Id = user.id;
  const todaysDate = new Date();
  const columns = [
    {
      title: 'Reason',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Time To',
      dataIndex: 'to',
      key: 'to',
    },
  ];

  const date = (time) => {
    const getTime = new Date(time);

    return (getTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  };

  const filteredDate = exceptionSlots
    ? exceptionSlots.filter((obj) => todaysDate <= new Date(obj.from))
    : [];

  const generateDate = (value) => {
    const dateObj = new Date(value);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const dataSource = filteredDate ? filteredDate.map((slot) => (
    {
      key: slot.id,
      from: date(slot.from),
      to: date(slot.to),
      title: slot.title,
      date: generateDate(slot.from)
    }
  )) : '';

  const updateExceptionSlot = () => {
    GetData(`exceptionSlots/${Id}`).then((promise) => setExceptionSlots(promise));
  };

  const onFinish = async (values) => {
    const fromTime = new Date(values.ExceptionSlots[0].$d);
    const from = fromTime.getTime();
    const toTime = new Date(values.ExceptionSlots[1].$d);
    const to = toTime.getTime();
    const exceptionSlot = {
      ...values,
      to,
      from,
      user_id: Id
    };
    const response = await PostData('exceptionSlots/', exceptionSlot);
    const data = await response.json();
    if (data.message === 'Generic Slot already taken for the selected day please go to edit profile to edit slot') {
      notification.open({
        style: { color: 'rgb(255,51,51)' },
        message: (
          <div style={{ color: 'rgb(255,51,51)' }}>Error</div>
        ),
        description: data.message,
        icon: <FrownOutlined style={{ color: 'rgb(255,51,51)' }} />
      });
    } else if (data.message === 'Updated Slot Successfully') {
      notification.open({
        style: { color: 'rgb(25, 135, 84)' },
        message: (
          <div style={{ color: 'rgb(25, 135, 84)' }}>Success</div>
        ),
        description: data.message,
        icon: <SmileOutlined style={{ color: 'rgb(25, 135, 84)' }} />
      });
    } else if (data.message === 'Invalid Body') {
      notification.open({
        style: { color: 'rgb(255,51,51)' },
        message: (
          <div style={{ color: 'rgb(255,51,51)' }}>Error</div>
        ),
        description: data.error.details[0].message,
        icon: <FrownOutlined style={{ color: 'rgb(255,51,51)' }} />
      });
    } else {
      notification.open({
        style: { color: 'rgb(25, 135, 84)' },
        message: (
          <div style={{ color: 'rgb(25, 135, 84)' }}>Success</div>
        ),
        description: EXCEPTION_SLOT_ADDED,
        icon: <SmileOutlined style={{ color: 'rgb(25, 135, 84)' }} />
      });
    }
    form.resetFields();
    updateExceptionSlot();
  };

  useEffect(() => {
    updateExceptionSlot();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/2 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-xl font-bold text-left">Exception Slots</h1>
        <Form
          form={form}
          name="normal_login"
          className="exception-slots-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          on
        >
          <Textfield
            name="title"
            labelText="Title"
            placeholder="Enter the Title"
            prefix={<FileTextOutlined className="site-form-item-icon" />}
            rules={[
              {
                required: true,
                message: VALID_REASON,
              },
            ]}
            type="text"
          />
          <Form.Item name="ExceptionSlots" rules={[{ required: true, message: VALID_TIME }]}>
            <RangePicker
              title="Select Time Slot"
              dropdownClassName="custom-range-picker"
              showTime={{ format: 'h:mm a' }}
              format="YYYY-MM-DD h:mm a"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between">
              <Button
                htmlType="submit"
                className="login-form-button text-white border-[#008080] bg-[#008080] hover:bg-[#20B2AA] hover:!text-white hover:!border-[#20B2AA]"
              >
                Save Slots
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}

export default ExceptionSlots;
