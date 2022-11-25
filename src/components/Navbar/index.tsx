import { Layout, Space } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/rpa-logo.png';
import './style.css';

export const Navbar = (): JSX.Element => {
  const { Header } = Layout;
  return (
    <Header>
      <Space direction="horizontal" size="large">
        <img src={logo} className="logo" />
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/autonomos" className="nav-link">
          Autônomos
        </Link>
        <Link to="/cargos" className="nav-link">
          Cargos
        </Link>
        <Link to="/contratos" className="nav-link">
          Contratos
        </Link>
      </Space>
    </Header>
  );
};
