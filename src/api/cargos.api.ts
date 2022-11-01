import { LoaderFunctionArgs } from 'react-router-dom';
import { Cargo, CARGO_DEFAULT_VALUE, UnsavedCargo } from '../models/cargo';
import { Pagination } from '../models/pagination';
import { httpClient } from '../utils/http-client';

// ---------------------------------------------------------

const API = '/cargos';

export const getCargos = async ({ request }: LoaderFunctionArgs) => {
  const response = await httpClient.get<Pagination<Cargo>>(API);
  return response.data;
};

export const getCargoById = async ({ params: { id } }: LoaderFunctionArgs) => {
  if (id === 'new') return CARGO_DEFAULT_VALUE;
  const response = await httpClient.get<Cargo>(`${API}/${id}`);
  return response.data;
};

export const saveNewCargo = async (item: UnsavedCargo): Promise<void> => {
  await httpClient.post(API, item);
};

export const updateCargo = async (item: Cargo): Promise<void> => {
  const { id, ...rest } = item;
  await httpClient.patch(`${API}/${id}`, rest);
};

export const removeCargo = async (item: Cargo): Promise<boolean> => {
  if (confirm(`Confirma a exclusão de "${item.nome}?"`)) {
    await httpClient.delete(`${API}/${item.id}`);
    return true;
  }
  return false;
};
