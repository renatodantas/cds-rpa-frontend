import { createBrowserRouter } from 'react-router-dom';
import { CargoEdit } from './pages/cargos/CargoEdit';
import { Cargos } from './pages/cargos/Cargos';
import { GenericError } from './pages/errors/GenericError';
import { Home } from './pages/Home';
import { LayoutApp } from './pages/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    errorElement: <GenericError />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'cargos',
        element: <Cargos />
      },
      {
        path: 'cargos/:id',
        element: <CargoEdit />
      }
    ]
  }
]);
