import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

const Layout = styled.div`
  margin: 20px;
  height: calc(100vh - 45px);
  border-radius: 5px;
  box-shadow: 0 5px 50px #b8b8b8;
  background: #F1F2F6;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 200px 100%;
`;

export const App = (): JSX.Element => {
  return (
    <Layout>
      <Navbar />
      <Container>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </Container>
    </Layout>
  );
};
