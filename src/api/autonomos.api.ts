import {
  Autonomo,
  AUTONOMO_DEFAULT_VALUE,
  UnsavedAutonomo
} from '../models/autonomo';
import {
  getPaginationRange as getPageRange,
  PageParams
} from '../models/page-params';
import { supabase } from '../utils/supabase';

const TABLE_NAME = 'Autonomos';

export async function getAutonomos({
  page,
  size,
  ascending,
  sort = 'nome'
}: PageParams<Autonomo>) {
  const { from, to } = getPageRange(page, size);
  return supabase
    .from(TABLE_NAME)
    .select('*')
    .order(sort, { ascending })
    .range(from, to);
}

export async function getAutonomoById(id: unknown): Promise<UnsavedAutonomo> {
  if (id === 'new') return AUTONOMO_DEFAULT_VALUE;
  const item = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  if (!item.data) {
    throw Error('Nenhum autônomo encontrado com ID ' + id);
  }
  return item.data;
}

export async function createAutonomo(item: UnsavedAutonomo) {
  return supabase.from(TABLE_NAME).insert(item);
}

export async function updateAutonomo(id: unknown, item: UnsavedAutonomo) {
  return supabase
    .from(TABLE_NAME)
    .update({ ...item })
    .eq('id', id);
}

export async function removeAutonomo(id: unknown) {
  return supabase.from(TABLE_NAME).delete().eq('id', id);
}
