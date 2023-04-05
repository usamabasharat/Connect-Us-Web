import React, { useState } from 'react';
import {
  Routes, Route, useLocation
} from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ForgotPassword from './containers/ForgotPassword';
import Login from './containers/Login';
import Register from './containers/Register';
import Meetings from './containers/Meetings';
import EditProfile from './containers/EditProfile';
import SettingPage from './containers/Settings';
import Questions from './containers/Questions';
import Dashboard from './containers/Dashboard';
import Feedback from './containers/Feedback';
import Profile from './containers/Profile';
import GenericSlots from './containers/GenericSlots';

const { Content } = Layout;

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showDrawer = () => {
    setIsMenuVisible(true);
  };

  const hideDrawer = () => {
    setIsMenuVisible(false);
  };

  const location = useLocation();
  const hideNavbar = ['/login', '/register', '/forgotpassword'].includes(location.pathname);
  const hideSidebar = ['/login', '/register', '/forgotpassword'].includes(location.pathname);

  return (
    <div className="App">
      <Layout>
        {!hideNavbar && <Navbar onMenuExpand={showDrawer} />}
        {!hideSidebar && <Sidebar isMenuVisible={isMenuVisible} hideDrawer={hideDrawer} />}
        <Content>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/genericSlots" element={<GenericSlots />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
