import { Route, Routes } from 'react-router-dom';
import { getCargos } from './api/cargos.api';
import { CargoEdit } from './pages/cargos/CargoEdit';
import { Cargos } from './pages/cargos/Cargos';
import { Home } from './pages/Home';
import { LayoutApp } from './pages/Layout';

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<LayoutApp />}>
        <Route index element={<Home />} />
        <Route path="cargos" element={<Cargos />} loader={getCargos} />
        <Route path="cargos/:id" element={<CargoEdit />} />
      </Route>
    </Routes>
  );
};
