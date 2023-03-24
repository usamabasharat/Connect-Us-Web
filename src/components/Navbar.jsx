import React from 'react';
import { Menu } from 'antd';
import {
  QuestionCircleOutlined, MessageOutlined, MenuOutlined, TeamOutlined, DashboardOutlined
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ onMenuExpand }) {
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };
  const MenuList = [
    {
      // key: '/questions',
      icon: <MenuOutlined />,
      onClick: onMenuExpand
    },
    {
      key: '/',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: '/meetings',
      label: 'Meetings',
      icon: <TeamOutlined />,
    },
    {
      key: '/questions',
      label: 'Questions',
      icon: <QuestionCircleOutlined />,
    },
    {
      key: '/feedback',
      label: 'Feedback',
      icon: <MessageOutlined />,
    },
  ];
  return (
    <Menu theme="light" mode="horizontal" className="border-[#008080] bg-[#008080] text-white" items={MenuList} onClick={onSelectMenu} />
  );
}
export default Navbar;
