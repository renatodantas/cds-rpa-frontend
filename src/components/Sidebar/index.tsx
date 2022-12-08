import {
  FileTextOutlined,
  HomeOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons';
import { FC } from 'react';
import { Container, SidebarMenuItem } from './style';

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
