import loadable from '@loadable/component';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { GenericError } from './pages/errors/GenericError';

const Login = loadable(() => import('./pages/Login'), {
  resolveComponent: (components) => components.Login
});

const Home = loadable(() => import('./pages/Home'), {
  resolveComponent: (components) => components.Home
});

const Cargos = loadable(() => import('./pages/cargos/Cargos'), {
  resolveComponent: (components) => components.Cargos
});

const CargoEdit = loadable(() => import('./pages/cargos/CargoEdit'), {
  resolveComponent: (components) => components.CargoEdit
});

const Autonomos = loadable(() => import('./pages/autonomos/Autonomos'), {
  resolveComponent: (components) => components.Autonomos
});

// prettier-ignore
const AutonomoEdit = loadable(() => import('./pages/autonomos/AutonomoEdit'), {
  resolveComponent: (components) => components.AutonomoEdit
});

const Contratos = loadable(() => import('./pages/contratos/Contratos'), {
  resolveComponent: (components) => components.Contratos
});

// prettier-ignore
const ContratoEdit = loadable(() => import('./pages/contratos/ContratoEdit'), {
  resolveComponent: (components) => components.ContratoEdit
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <GenericError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'cargos', element: <Cargos /> },
      { path: 'cargos/:id', element: <CargoEdit /> },
      { path: 'autonomos', element: <Autonomos /> },
      { path: 'autonomos/:id', element: <AutonomoEdit /> },
      { path: 'contratos', element: <Contratos /> },
      { path: 'contratos/:id', element: <ContratoEdit /> }
    ]
  }
]);
