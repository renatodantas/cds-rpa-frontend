import loadable from '@loadable/component';
import { createBrowserRouter } from 'react-router-dom';
import { GenericError } from './pages/errors/GenericError';
import { LayoutApp } from './pages/Layout';

const LazyLogin = loadable(() => import('./pages/Login'), {
  resolveComponent: (components) => components.Login
});

const LazyHome = loadable(() => import('./pages/Home'), {
  resolveComponent: (components) => components.Home
});

const LazyCargos = loadable(() => import('./pages/cargos/Cargos'), {
  resolveComponent: (components) => components.Cargos
});

const LazyCargoEdit = loadable(() => import('./pages/cargos/CargoEdit'), {
  resolveComponent: (components) => components.CargoEdit
});

const LazyAutonomos = loadable(() => import('./pages/autonomos/Autonomos'), {
  resolveComponent: (components) => components.Autonomos
});

// prettier-ignore
const LazyAutonomoEdit = loadable(() => import('./pages/autonomos/AutonomoEdit'), {
  resolveComponent: (components) => components.AutonomoEdit
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    errorElement: <GenericError />,
    children: [
      { index: true, element: <LazyHome /> },
      { path: 'login', element: <LazyLogin /> },
      { path: 'cargos', element: <LazyCargos /> },
      { path: 'cargos/:id', element: <LazyCargoEdit /> },
      { path: 'autonomos', element: <LazyAutonomos /> },
      { path: 'autonomos/:id', element: <LazyAutonomoEdit /> }
    ]
  }
]);
