import dayjs from 'dayjs';
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
    .select('*, Autonomos (nome)')
    // .order(sort, { ascending })
    .range(from, to)
    .then(res => ({
      count: res.count || 0,
      data: res.data?.map(item => ({
        id: item.id,
        vigenciaInicio: dayjs(item.vigenciaInicio),
        vigenciaFim: dayjs(item.vigenciaFim),
        autonomo: item.Autonomos
      }))
    }));
}

export async function getContratoById(id: unknown): Promise<UnsavedContrato> {
  return CONTRATO_DEFAULT_VALUE;
  // if (id === 'new') return CONTRATO_DEFAULT_VALUE;
  // const res = await supabase
  //   .from(TABLE_NAME)
  //   .select(`
  //     id,
  //     vigenciaInicio,
  //     vigenciaFim,
  //     valorVT,
  //     valorVR,
  //     valorDiaria,
  //     encerradoManualmente,
  //     Autonomos (id, nome)`)
  //   .eq('id', id)
  //   .single()
  //   .then(item => ({
  //     id: item.data?.id,
  //     vigenciaInicio: dayjs(item.data?.vigenciaInicio),
  //     vigenciaFim: dayjs(item.data?.vigenciaFim),
  //     autonomo: item.data?.Autonomos
  //   }));
  // return {
  //   id: res.id,
  //   vigenciaInicio: res.vigenciaInicio
  // };
}

export async function createContrato(item: UnsavedContrato) {
  // FIXME: tratar
  // return supabase.from(TABLE_NAME).insert(item);
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
