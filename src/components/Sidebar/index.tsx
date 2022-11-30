import {
  HomeOutlined
} from '@ant-design/icons';
import { FC } from 'react';
import { Container, SidebarMenuItem } from './style';

type LinkProps = { label: string, to: string; icon: FC; };
const links: LinkProps[] = [
  { label: 'Home', to: '/', icon: HomeOutlined },
  { label: 'Autônomos', to: '/autonomos', icon: HomeOutlined },
  { label: 'Cargos', to: '/cargos', icon: HomeOutlined },
  { label: 'Contratos', to: '/contratos', icon: HomeOutlined },
];

export const Sidebar = (): JSX.Element => {
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
