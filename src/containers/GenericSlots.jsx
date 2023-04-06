import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, TimePicker, Button, notification, Select, Table
} from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { GENERIC_SLOT_ADDED, VALID_TIME } from '../constants/messages';
import './MyRangePicker.css';
import { GetData, PostData, PutData } from '../API/api';

function GenericSlots() {
  const location = useLocation();
  const update = location.state;
  const { RangePicker } = TimePicker;
  const { user } = useSelector((state) => state.user);
  const [genericSlots, setGenericSlots] = useState();
  const [form] = Form.useForm();
  const Id = user.id;
  const date = (dateObj) => {
    const getTime = new Date(dateObj);
    return (getTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  };
  const dataSource = genericSlots ? genericSlots.map((slot) => (
    {
      key: slot.id,
      weekday: slot.type,
      from: date(slot.from),
      to: date(slot.to)
    }
  )) : '';
  const columns = [
    {
      title: 'Weekday',
      dataIndex: 'weekday',
      key: 'weekday',
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
  const updateGenericSlot = () => {
    GetData(`genericSlots/${Id}`).then((promise) => setGenericSlots(promise));
  };
  useEffect(() => {
    updateGenericSlot();
  }, []);
  const onFinish = async (values) => {
    const fromTime = new Date(values.GenericSlots[0].$d);
    const from = fromTime.getTime();
    const toTime = new Date(values.GenericSlots[1].$d);
    const to = toTime.getTime();
    values.user_id = 1;
    const day = values.type;
    const genericSlot = {
      ...values,
      to,
      from,
    };
    const response = update ? await PutData(`genericSlots/${day}`, genericSlot) : await PostData('genericSlots/', genericSlot);
    const data = await response.json();
    if (data.message === 'Generic Slot already taken for the selected day please go to edit profile to edit slot') {
      notification.open({
        message: 'Error',
        description: data.message,
        icon: <FrownOutlined style={{ color: '#108EE9' }} />
      });
    } else if (data.message === 'Updated Slot Successfully') {
      notification.open({
        message: 'Success',
        description: data.message,
        icon: <SmileOutlined style={{ color: '#108EE9' }} />
      });
    } else if (data.message === 'Invalid Body') {
      notification.open({
        message: 'Error',
        description: data.error.details[0].message,
        icon: <FrownOutlined style={{ color: '#108EE9' }} />
      });
    } else {
      notification.open({
        message: 'Success',
        description: GENERIC_SLOT_ADDED,
        icon: <SmileOutlined style={{ color: '#108EE9' }} />
      });
    }
    form.resetFields();
    updateGenericSlot();
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/4 border-2 rounded-md p-5 space-y-10 bg-white">
        <h1 className="text-[#008080] text-xl font-bold text-left">Generic Slots</h1>
        <Form
          form={form}
          name="normal_login"
          className="generic-slots-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          on
        >
          <Form.Item name="GenericSlots" rules={[{ required: true, message: VALID_TIME }]}>
            <RangePicker
              title="Select Time Slot"
              popupClassName="custom-range-picker"
              showTime={{ format: 'h:mm a' }}
              format="h:mm a"
              className="w-full"
            />
          </Form.Item>
          <Form.Item className="text-left" name="type" label="Weekdays">
            <Select className="flex-col">
              <Select.Option className="ml-2 h-[30px]" value="monday">
                Monday
              </Select.Option>
              <Select.Option className="ml-2 h-[30px]" value="tuesday">
                Tuesday
              </Select.Option>
              <Select.Option className="ml-2 h-[30px]" value="wednesday">
                Wednesday
              </Select.Option>
              <Select.Option className="ml-2 h-[30px]" value="thursday">
                Thursday
              </Select.Option>
              <Select.Option className="ml-2 h-[30px]" value="friday">
                Friday
              </Select.Option>
            </Select>
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

export default GenericSlots;
