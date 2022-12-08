import {
  Autonomo,
  AUTONOMO_DEFAULT_VALUE
} from '../models/autonomo';
import {
  getPaginationRange as getPageRange,
  PageParams
} from '../models/page-params';
import { Pagination } from '../models/pagination';
import { http } from '../utils/http-client';

const API = '/autonomos';

export async function findAutonomos({
  page,
  size,
  ascending,
  sort = 'nome'
}: PageParams<Autonomo>) {
  const { from, to } = getPageRange(page, size);
  return http.get<Pagination<Autonomo>>(API)
    .then(res => res.data);
}

export async function findAutonomoById(id: unknown): Promise<Autonomo> {
  if (id === 'new') return AUTONOMO_DEFAULT_VALUE;
  return http
    .get(`${API}/${id}`)
    .then(res => res.data);
}

export async function createAutonomo(item: Autonomo) {
  return http.post(API, { item });
}

export async function updateAutonomo(id: unknown, item: Autonomo) {
  return http.put(`${API}/${id}`, { item });
}

export async function removeAutonomo(id: unknown) {
  return http.delete(`${API}/${id}`);
}
