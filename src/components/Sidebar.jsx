/* eslint-disable react/prop-types */
import React from 'react';
import { Menu, Drawer } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

// const { Sider } = Layout;

function Sidebar({ visible, onClose }) {
  return (
    <Drawer
      className="ant-layout-sider-dark"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={200}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Drawer>
  );
}

export default Sidebar;
