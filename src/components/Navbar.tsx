import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/rpa-logo.png';

export const Navbar = (): JSX.Element => {
  return (
    <Container>
      <Logo src={logo} />

      <LinksContainer>
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
      </LinksContainer>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 5px 40px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  & > a {
    text-decoration: none;
  }
`;

const Logo = styled.img`
  width: 50px;
`;
