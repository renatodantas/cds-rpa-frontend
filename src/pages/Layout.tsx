import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export const LayoutApp = (): JSX.Element => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Header>
        RPA
        <Link to="/">Home</Link>
        {' - '}
        <Link to="/cargos">Cargos</Link>
        {' - '}
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
