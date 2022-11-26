import { Link } from 'react-router-dom';
import logo from '../../assets/rpa-logo.png';
import { Container, LinksContainer, Logo } from './style';

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
