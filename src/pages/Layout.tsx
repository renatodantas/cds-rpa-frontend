import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../lib/Navbar';
import './Layout.css';

export const LayoutApp = (): JSX.Element => {
  const { Content } = Layout;
  return (
    <Layout>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
