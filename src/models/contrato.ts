import dayjs from 'dayjs';
import type { Autonomo } from './autonomo';
import type { Cargo } from './cargo';

export interface Contrato {
  id: number;
  vigenciaInicio: string;
  vigenciaFim: string;
  valorVT: number | null;
  valorVR: number | null;
  valorDiaria: number | null;
  encerradoManualmente: boolean;
  idAutonomo: number;
  idCargo: number;
  //diarias: Diaria[];
  _autonomo?: Autonomo;
  _cargo?: Cargo;
}

export type UnsavedContrato = Omit<Contrato, 'id'>;

export const CONTRATO_DEFAULT_VALUE: UnsavedContrato = {
  vigenciaInicio: dayjs().toISOString(),
  vigenciaFim: dayjs().toISOString(),
  valorVT: null,
  valorVR: null,
  valorDiaria: null,
  encerradoManualmente: false,
  idAutonomo: -1,
  idCargo: -1
  //diarias: []
};
