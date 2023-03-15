/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined, InfoCircleOutlined, UserOutlined, SettingOutlined, MenuOutlined,
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

function Navbar({ onMenuExpand }) {
  return (
    <Menu theme="light" mode="horizontal" className="border-[#008080] bg-[#008080] text-white">
      <Menu.Item key="menu-icon" icon={<MenuOutlined />} onClick={onMenuExpand} />
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="about" icon={<InfoCircleOutlined />}>
        About
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
