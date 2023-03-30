import React from 'react';
import {
  Layout, Avatar
} from 'antd';
import 'tailwindcss/tailwind.css';

const { Content } = Layout;

function Profile() {
  return (
    <Layout>
      <h1 className="mt-10 text-[#008080] text-3xl">Profile</h1>
      <Content>
        <Avatar className="mt-20" size={150} src="https://i.pravatar.cc/150" />
        <h1 className="text-2xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-600 mb-1">Email: john.doe@example.com</p>
        <p className="text-gray-600 mb-1">Phone: +1 555-555-5555</p>
        <p className="text-gray-600 mb-1">Address: 123 Main St, Anytown USA</p>
      </Content>
    </Layout>
  );
}

export default Profile;
