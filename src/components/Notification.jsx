import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';

function Notification(flag, message) {
  if (flag) {
    notification.open({
      style: { color: 'rgb(25, 135, 84)' },
      message: (
        <div style={{ color: 'rgb(25, 135, 84)' }}>Success</div>
      ),
      description: message,
      icon: <SmileOutlined style={{ color: 'rgb(25, 135, 84)' }} />
    });
  } else {
    notification.open({
      style: { color: 'rgb(255,51,51)' },
      message: (
        <div style={{ color: 'rgb(255,51,51)' }}>Error</div>
      ),
      description: message,
      icon: <FrownOutlined style={{ color: 'rgb(255,51,51)' }} />
    });
  }
}

export default Notification;
