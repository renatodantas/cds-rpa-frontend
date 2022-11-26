import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  padding: 0 ;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  border: 1px dashed red;
`;

export const Logo = styled.img`
  width: 50px;
`;
