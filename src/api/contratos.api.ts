import { Contrato, CONTRATO_DEFAULT_VALUE, UnsavedContrato } from '../models/contrato';
import {
  getPaginationRange,
  PageParams
} from '../models/page-params';
import { supabase } from '../utils/supabase';

const TABLE_NAME = 'Contratos';

export async function getContratos({
  page,
  size,
  ascending,
  sort = 'vigenciaInicio'
}: PageParams<Contrato>) {
  const { from, to } = getPaginationRange(page, size);
  return supabase
    .from(TABLE_NAME)
    .select('*')
    .order(sort, { ascending })
    .range(from, to);
}

export async function getContratoById(id: unknown): Promise<UnsavedContrato> {
  if (id === 'new') return CONTRATO_DEFAULT_VALUE;
  const item = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();
  return item.data || CONTRATO_DEFAULT_VALUE;
}

export async function createContrato(item: UnsavedContrato) {
  return supabase.from(TABLE_NAME).insert(item);
}

export async function updateContrato(id: unknown, item: UnsavedContrato) {
  return supabase
    .from(TABLE_NAME)
    .update({ ...item })
    .eq('id', id);
}

export async function removeContrato(id: unknown) {
  return supabase.from(TABLE_NAME).delete().eq('id', id);
}
