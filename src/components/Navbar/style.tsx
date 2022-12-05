import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 5px 40px;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  & > a {
    text-decoration: none;
  }
`;

export const Logo = styled.img`
  width: 50px;
`;
