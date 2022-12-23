import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  return (
    <Container id='app-container'>
      <Navbar />
      <Section>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem;
  border-radius: 0.7rem;
  box-shadow: 0 5px 50px #b8b8b8;
  background: #F1F2F6;
`;

const Section = styled.section`
  display: flex;
`;

const Main = styled.main`
  padding: 20px;
  flex: 1;
`;
