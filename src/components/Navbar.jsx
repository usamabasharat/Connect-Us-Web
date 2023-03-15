/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined, InfoCircleOutlined, UserOutlined, SettingOutlined, MenuOutlined,
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Header } = Layout;

function Navbar({ onMenuClick }) {
  return (
    <Header className="bg-green-800">
      <Menu theme="light" mode="horizontal" className="bg-green-800 text-white justify-center">
        <Menu.Item key="menu-icon" icon={<MenuOutlined />} onClick={onMenuClick} />
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
      <MenuOutlined className="menu-icon" onClick={onMenuClick} />
    </Header>
  );
}

export default Navbar;
