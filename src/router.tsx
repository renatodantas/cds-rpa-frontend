import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AutonomoEdit } from './pages/autonomos/AutonomoEdit';
import { Autonomos } from './pages/autonomos/Autonomos';
import { GenericError } from './pages/errors/GenericError';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <GenericError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      // { path: 'cargos', element: <Cargos /> },
      // { path: 'cargos/:id', element: <CargoEdit /> },
      { path: 'autonomos', element: <Autonomos /> },
      { path: 'autonomos/:id', element: <AutonomoEdit /> },
      // { path: 'contratos', element: <Contratos /> },
      // { path: 'contratos/:id', element: <ContratoEdit /> }
    ]
  }
]);
