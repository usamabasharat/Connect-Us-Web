import { Modal } from 'antd';
import React from 'react';

function EventModal(isModalVisible) {
  console.log('here');
    <Modal
      title="Schedule Meeting"
      open={isModalVisible}
    //   onCancel={handleCancel}
      footer={null}
    />;
}

export default EventModal;
