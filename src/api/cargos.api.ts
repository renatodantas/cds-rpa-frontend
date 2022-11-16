import { Cargo, CARGO_DEFAULT_VALUE, UnsavedCargo } from '../models/cargo';
import {
  getPaginationRange as getPageRange,
  PageParams
} from '../models/page-params';
import { supabase } from '../utils/supabase';

export async function getCargos({
  page,
  size,
  ascending,
  sort
}: PageParams<Cargo>) {
  const { from, to } = getPageRange(page, size);
  console.log('Fetching:', page, size, sort, ascending);
  return supabase
    .from('Cargos')
    .select('*')
    .order(sort!, { ascending })
    .range(from, to);
}

export async function getCargoById(id: unknown): Promise<UnsavedCargo> {
  console.log('Fetching cargo ', id);
  if (id === 'new') return CARGO_DEFAULT_VALUE;
  const item = await supabase.from('Cargos').select('*').match({ id }).single();
  return item.data || CARGO_DEFAULT_VALUE;
}

export async function createCargo(item: UnsavedCargo) {
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
