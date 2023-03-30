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
      key: '/',
      icon: <MenuOutlined />,
      className: 'focus:!text-black after:!border-b-0',
      onClick: onMenuExpand
    },
    {
      key: '/',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      className: 'focus:!text-black after:!border-b-0',
    },
    {
      key: '/meetings',
      label: 'Meetings',
      icon: <TeamOutlined />,
      className: 'focus:!text-black after:!border-b-0',
    },
    {
      key: '/questions',
      label: 'Questions',
      icon: <QuestionCircleOutlined />,
      className: 'focus:!text-black after:!border-b-0',
    },
    {
      key: '/feedback',
      label: 'Feedback',
      icon: <MessageOutlined />,
      className: 'focus:!text-black after:!border-b-0',
    },
  ];
  return (
    <Menu theme="light" mode="horizontal" className="border-[#008080] bg-[#008080] text-white active:!text-black" items={MenuList} onClick={onSelectMenu} />
    },
  ];
}
export default Navbar;
