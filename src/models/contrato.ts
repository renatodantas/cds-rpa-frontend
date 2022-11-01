import { DateTime } from 'luxon';
import type { Autonomo } from './autonomo';
import type { Cargo } from './cargo';
import type { Diaria } from './diaria';

export interface Contrato {
  id?: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  valorVT?: number;
  valorVR?: number;
  valorDiaria?: number;
  encerradoManualmente: boolean;
  idAutonomo?: string;
  idCargo?: string;
  diarias: Diaria[];
  _autonomo?: Autonomo;
  _cargo?: Cargo;
}

export const CONTRATO_DEFAULT_VALUE: Contrato = {
  vigenciaInicio: DateTime.now().toISODate(),
  vigenciaFim: DateTime.now().toISODate(),
  encerradoManualmente: false,
  diarias: []
}