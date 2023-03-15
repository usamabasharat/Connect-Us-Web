import React, { useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// import ForgotPassword from './containers/ForgotPassword';
import Register from './containers/Register';

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
      <Layout>
        <Navbar onMenuExpand={showDrawer} />
        <Sidebar isMenuVisible={isMenuVisible} hideDrawer={hideDrawer} />
        <Layout>
          <Content>
            <Register />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
