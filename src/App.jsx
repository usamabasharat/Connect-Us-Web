import React, { useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ForgotPassword from './containers/ForgotPassword';

const { Content } = Layout;

function App() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <Layout>
        <Navbar onMenuClick={showDrawer} />
        <Sidebar visible={visible} onClose={onClose} />
        <Layout>
          <Content>
            <ForgotPassword />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
