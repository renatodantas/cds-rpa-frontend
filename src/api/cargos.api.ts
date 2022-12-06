import { Cargo, CARGO_DEFAULT_VALUE, UnsavedCargo } from '../models/cargo';
import {
  getPaginationRange as getPageRange,
  PageParams
} from '../models/page-params';
import { supabase } from '../utils/supabase';

const TABLE_NAME = 'Cargos';

export async function getCargos({
  page,
  size,
  ascending,
  sort = 'nome'
}: PageParams<Cargo>) {
  const { from, to } = getPageRange(page, size);
  return supabase
    .from(TABLE_NAME)
    .select('*')
    .order(sort, { ascending })
    .range(from, to);
}

export async function getCargoById(id: unknown): Promise<UnsavedCargo> {
  if (id === 'new') return CARGO_DEFAULT_VALUE;
  const item = await supabase
    .from(TABLE_NAME)
    .select('*')
    .match({ id })
    .single();
  return item.data || CARGO_DEFAULT_VALUE;
}

export async function createCargo(item: UnsavedCargo) {
  return supabase.from(TABLE_NAME).insert(item);
}

export async function updateCargo(id: unknown, item: UnsavedCargo) {
  return supabase
    .from(TABLE_NAME)
    .update({ ...item })
    .eq('id', id);
}

export async function removeCargo(id: unknown) {
  return supabase.from(TABLE_NAME).delete().eq('id', id);
}
