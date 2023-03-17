<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ForgotPassword from './containers/ForgotPassword';
import Login from './containers/Login';
import Register from './containers/Register';
import Meetings from './containers/Meetings';

const { Content } = Layout;

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showDrawer = () => {
    setIsMenuVisible(true);
  };

  const hideDrawer = () => {
    setIsMenuVisible(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Navbar onMenuExpand={showDrawer} />
          <Sidebar isMenuVisible={isMenuVisible} hideDrawer={hideDrawer} />
          <Content>
            <Routes>
              <Route exact path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/meetings" element={<Meetings />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </div>
=======
import React from 'react';
import Register from './containers/Register';

function App() {
  return (
    <Register />
>>>>>>> master
  );
}

export default App;
