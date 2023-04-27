import React from 'react';
import { useSelector } from 'react-redux';
import {
  Layout, Avatar
} from 'antd';
import 'tailwindcss/tailwind.css';

const { Content } = Layout;

function Profile() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <Layout>
      <h1 className="mt-10 text-[#008080] text-3xl">Profile</h1>
      <Content>
        <Avatar className="mt-20" size={150} src="https://i.pravatar.cc/150" />
        <h1 className="text-2xl font-bold mb-2">
          {user.first_name}
          {' '}
          {user.last_name}
          {' '}
        </h1>
        <p className="text-gray-600 mb-1">
          Email:
          {' '}
          {user.email}
        </p>
        <p className="text-gray-600 mb-1">
          Phone:
          {' '}
          {user.phone}
        </p>
        <p className="text-gray-600 mb-1">
          Role:
          {' '}
          {user.role}
        </p>
        <p className="text-gray-600 mb-1">
          Designation:
          {' '}
          {user.designation}
        </p>
      </Content>
    </Layout>
  );
}

export default Profile;
