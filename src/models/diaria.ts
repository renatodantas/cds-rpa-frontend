import { DateTime } from "luxon";
import type { Contrato } from "./contrato";

export interface Diaria {
  id?: string;
  data: DateTime;
  valorVT?: number; // (busca do contrato)
  valorVR?: number; // (busca do contrato)
  valorDiaria: number; // (busca do contrato)
  observacao?: string; // (justificar alteração de valor)
  idContrato?: string;
  _contrato?: Contrato;
}

/**
 * Usada na tela de seleção dos valores das diárias para pagamento.
 */
export interface DiariaSelecaoPagamento extends Diaria {
  tudoSelecionado: boolean;
  vtSelecionado: boolean;
  vrSelecionado: boolean;
  diariaSelecionada: boolean;
  disableVT?: boolean;
  disableVR?: boolean;
  disableDiaria?: boolean;
}

export const DIARIA_DEFAULT_VALUE: Diaria = {
  data: DateTime.now(),
  valorDiaria: 0,
}