import {
  Autonomo,
  AUTONOMO_DEFAULT_VALUE,
  UnsavedAutonomo
} from '../models/autonomo';
import { PageParams, Pagination } from '../models/pagination';
import { httpClient } from '../utils/http-client';

/**
 * Nome dos caches das consultas; usadas para invalidação.
 */
export enum AutonomosQueries {
  GetAll = 'Autonomos-GetAll',
  GetById = 'Autonomos-GetById',
  Update = 'Autonomos-Update',
  Delete = 'Autonomos-Delete'
}

const API = '/autonomos';

export const getAutonomos = async (
  params: PageParams
): Promise<Pagination<Autonomo>> => {
  const response = await httpClient.get<Pagination<Autonomo>>(API, { params });
  return response.data;
};

export const getAutonomoById = async (id: unknown) => {
  if (id === 'new') return { ...AUTONOMO_DEFAULT_VALUE };
  const response = await httpClient.get<Autonomo>(`${API}/${id}`);
  return response.data;
};

export const saveNewAutonomo = async (item: UnsavedAutonomo): Promise<void> => {
  await httpClient.post(API, item);
};

export const updateAutonomo = async (
  id: unknown,
  item: UnsavedAutonomo
): Promise<void> => {
  await httpClient.put(`${API}/${id}`, item);
};

export const removeAutonomo = async (id: unknown): Promise<void> => {
  await httpClient.delete(`${API}/${id}`);
};
