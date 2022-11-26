<<<<<<< HEAD
=======
import { Space } from 'antd';
>>>>>>> ec68223f9c5a49ae48c66f3f359684af7995cb74
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/rpa-logo.png';
import { Container, LinksContainer, Logo } from './style';

const StyledNavbar = styled.header`
  border-bottom: 1px solid rgba(0,0,0, 0.05);
  padding: 5px 50px;
`;

export const Navbar = (): JSX.Element => {
<<<<<<< HEAD
  return (
    <Container>
      <Logo src={logo} />

      <LinksContainer>
=======

  return (
    <StyledNavbar>
      <Space direction="horizontal" size="large">
        <img src={logo} className="logo" />
>>>>>>> ec68223f9c5a49ae48c66f3f359684af7995cb74
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
<<<<<<< HEAD
      </LinksContainer>
    </Container>
=======
      </Space>
    </StyledNavbar>
>>>>>>> ec68223f9c5a49ae48c66f3f359684af7995cb74
  );
};
