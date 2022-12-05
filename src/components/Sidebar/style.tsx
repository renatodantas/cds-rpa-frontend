import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 1.5rem;
  border-right: 1px solid rgba(0,0,0,0.1);
`;

export const SidebarMenuItem = styled(Link)`
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  &:hover {
    color: ${blue.primary};
  }
  span {
    margin-right: 15px;
  }
`;
