import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined, UserOutlined, SettingOutlined, MenuOutlined, TeamOutlined
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

function Navbar({ onMenuExpand }) {
  return (
    <Menu theme="light" mode="horizontal" className="border-[#008080] bg-[#008080] text-white">
      <Menu.Item key="menu-icon" icon={<MenuOutlined />} onClick={onMenuExpand} />
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="meetings" icon={<TeamOutlined />}>
        <Link to="/meetings">Meetings</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
