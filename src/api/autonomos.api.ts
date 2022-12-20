import { useMutation, useQuery } from 'react-query';
import {
  Autonomo,
  AUTONOMO_DEFAULT_VALUE
} from '../models/autonomo';
import { getPaginationRange, PaginationInput, PaginationOutput } from '../models/pagination';
import { http } from '../utils/http-client';

const API = '/autonomos';
export const AutonomosQueries = {
  LIST: 'Autonomos::find',
  SELECTED: 'Autonomos::selected',
  CREATE: 'Autonomos::create',
  UPDATE: 'Autonomos::update',
  DELETE: 'Autonomos::delete'
};

export function findAutonomos({
  page,
  size,
  ascending,
  sort = 'nome'
}: PaginationInput<Autonomo>) {
  const { from, to } = getPaginationRange(page, size);
  return useQuery(AutonomosQueries.LIST, () =>
    http.get<PaginationOutput<Autonomo>>(API)
      .then(res => res.data)
  );
}

export function findAutonomoById(id = 'new') {
  return useQuery([AutonomosQueries.SELECTED, id], ({ queryKey }) => queryKey[1] === 'new'
    ? AUTONOMO_DEFAULT_VALUE
    : http.get(`${API}/${queryKey[1]}`)
      .then(res => res.data));
}

export function createAutonomo() {
  return useMutation((item: Autonomo) => http.post(API, { ...item }));
}

export function updateAutonomo(id: unknown) {
  return useMutation((item: Autonomo) => http.put(`${API}/${id}`, { ...item }));
}

export function deleteAutonomo() {
  return useMutation((id: number) => http.delete(`${API}/${id}`));
}
