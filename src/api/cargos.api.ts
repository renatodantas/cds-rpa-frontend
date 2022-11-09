import { Cargo, CARGO_DEFAULT_VALUE, UnsavedCargo } from '../models/cargo';
import { PageParams, Pagination } from '../models/pagination';
import { httpClient } from '../utils/http-client';

/**
 * Nome dos caches das consultas; usadas para invalidação.
 */
export enum CargosQueries {
  GetAll = 'Cargos-GetAll',
  GetById = 'Cargos-GetById',
  Update = 'Cargos-Update',
  Delete = 'Cargos-Delete'
}

const API = '/cargos';

export const getCargos = async (
  params: PageParams
): Promise<Pagination<Cargo>> => {
  const response = await httpClient.get<Pagination<Cargo>>(API, { params });
  return response.data;
};

export const getCargoById = async (id: unknown) => {
  if (id === 'new') return { ...CARGO_DEFAULT_VALUE };
  const response = await httpClient.get<Cargo>(`${API}/${id}`);
  return response.data;
};

export const saveNewCargo = async (item: UnsavedCargo): Promise<void> => {
  await httpClient.post(API, item);
};

export const updateCargo = async (id: unknown, item: Cargo): Promise<void> => {
  await httpClient.put(`${API}/${id}`, item);
};

export const removeCargo = async (id: unknown): Promise<void> => {
  await httpClient.delete(`${API}/${id}`);
};
