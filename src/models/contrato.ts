import dayjs, { Dayjs } from 'dayjs';
import { Autonomo } from './autonomo';
import { Cargo } from './cargo';

export interface Contrato {
  id: number;
  vigenciaInicio: Dayjs;
  vigenciaFim: Dayjs;
  valorVT: number | null;
  valorVR: number | null;
  valorDiaria: number | null;
  encerradoManualmente: boolean;
  // idAutonomo: number;
  // idCargo: number;
  //diarias: Diaria[];
  autonomo: Autonomo | null;
  cargo: Cargo | null;
}

export type UnsavedContrato = Omit<Contrato, 'id'>;

export const CONTRATO_DEFAULT_VALUE: UnsavedContrato = {
  vigenciaInicio: dayjs(),
  vigenciaFim: dayjs().add(1, 'day'),
  valorVT: null,
  valorVR: null,
  valorDiaria: null,
  encerradoManualmente: false,
  autonomo: null,
  cargo: null
  // idAutonomo: -1,
  // idCargo: -1
  //diarias: []
};
