/* eslint-disable react/prop-types */
import React from 'react';
import { Menu, Drawer } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

function Sidebar({ isMenuVisible, hideDrawer }) {
  return (
    <Drawer
      className="ant-layout-sider-dark"
      placement="left"
      onClose={hideDrawer}
      open={isMenuVisible}
      width={200}
    >
      <div className="logo" />
      <Menu mode="inline" defaultSelectedKeys={['1']}>
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
