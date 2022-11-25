import { Space } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/rpa-logo.png';
import './style.css';

const StyledNavbar = styled.header`
  border-bottom: 1px solid rgba(0,0,0, 0.05);
  padding: 5px 50px;
`;

export const Navbar = (): JSX.Element => {

  return (
    <StyledNavbar>
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
    </StyledNavbar>
  );
};
