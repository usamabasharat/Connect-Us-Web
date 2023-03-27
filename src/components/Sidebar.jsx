import React from 'react';
import { Menu, Drawer } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { UserOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';

function Sidebar({ isMenuVisible, hideDrawer }) {
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };
  const MenuList = [
    {
      key: '/profile',
      label: 'Profile',
      icon: <UserOutlined />
    },
    {
      key: '/editprofile',
      label: 'Edit Profile',
      icon: <EditOutlined />,
    },
    {
      key: '/settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    }
  ];
  return (
    <Drawer
      className="ant-layout-sider-dark"
      placement="left"
      onClose={() => {
        <Link to="/"> </Link>;
        hideDrawer();
      }}
      open={isMenuVisible}
      width={200}
    >
      <Menu theme="light" mode="inline" items={MenuList} onClick={onSelectMenu} />
    </Drawer>
  );
}

export default Sidebar;
