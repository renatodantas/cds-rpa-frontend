import {
  FileTextOutlined,
  HomeOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { FC } from 'react';
import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type LinkProps = { label: string, to: string; icon: FC; };
const links: LinkProps[] = [
  { label: 'Home', to: '/', icon: HomeOutlined },
  { label: 'Autônomos', to: '/autonomos', icon: UserOutlined },
  { label: 'Cargos', to: '/cargos', icon: TagOutlined },
  { label: 'Contratos', to: '/contratos', icon: FileTextOutlined },
];

export const Sidebar = () => {
  return (
    <Container>
      {links.map(({ label, to, icon: Component }) =>
        <SidebarMenuItem key={to} to={to}>
          <Component />
          {label}
        </SidebarMenuItem>
      )}
    </Container>
  );
};

const Container = styled.aside`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 1.5rem;
  border-right: 1px solid rgba(0,0,0,0.1);
`;

const SidebarMenuItem = styled(Link)`
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
