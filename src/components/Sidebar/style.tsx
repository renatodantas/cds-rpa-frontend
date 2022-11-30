import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 30px;
  padding: 1.5rem;
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
