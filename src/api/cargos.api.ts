import { Cargo, CARGO_DEFAULT_VALUE, UnsavedCargo } from '../models/cargo';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  getPaginationRange as getPageRange,
  PageParams
} from '../models/page-params';
import { supabase } from '../utils/supabase';

/**
 * Nome dos caches das consultas; usadas para invalidação.
 */
export enum CargosQueries {
  GetAll = 'Cargos-GetAll',
  GetById = 'Cargos-GetById',
  Update = 'Cargos-Update',
  Delete = 'Cargos-Delete'
}

export async function getCargos({
  page = DEFAULT_PAGE,
  size = DEFAULT_SIZE,
  ascending = DEFAULT_ORDER,
  sort = 'nome'
}: PageParams<Cargo>) {
  const { from, to } = getPageRange(page, size);
  console.log('Fetching cargos...');
  return supabase
    .from('Cargos')
    .select('*')
    .order(sort, { ascending })
    .range(from, to);
}

export async function getCargoById(id: unknown): Promise<UnsavedCargo> {
  console.log('Fetching cargo ', id);
  if (id === 'new') return CARGO_DEFAULT_VALUE;
  const item = await supabase.from('Cargos').select('*').match({ id }).single();
  return item.data || CARGO_DEFAULT_VALUE;
}

export async function saveNewCargo(item: UnsavedCargo) {
  return supabase.from('Cargos').insert(item);
}

export async function updateCargo(id: unknown, item: UnsavedCargo) {
  return supabase
    .from('Cargos')
    .update({ ...item })
    .eq('id', id);
}

export async function removeCargo(id: unknown) {
  return supabase.from('Cargos').delete().eq('id', id);
}
