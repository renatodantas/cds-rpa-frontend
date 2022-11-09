import { Layout, Space } from 'antd';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import logo from '../assets/rpa-logo.png';

export const Navbar = (): JSX.Element => {
  const { Header } = Layout;
  return (
    <Header>
      <Space direction="horizontal" size="large">
        <img src={logo} className={style.logo} />
        <Link to="/">Home</Link>
        <Link to="/cargos">Cargos</Link>
      </Space>
    </Header>
  );
};
