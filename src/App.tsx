import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

const Container = styled.div`
  margin: 20px;
  height: calc(100vh - 45px);
  border-radius: 5px;
  box-shadow: 0 5px 50px #b8b8b8;
  background: #F1F2F6;
`;

const Section = styled.section`
  display: flex;
  height: calc(100vh - 105px);
`;

const Main = styled.main`
  padding: 20px;
  flex: 1;
`;

export const App = () => {
  return (
    <Container>
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
