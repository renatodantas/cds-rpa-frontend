import type { Contrato } from "./contrato";

export interface Autonomo {
  id: number;
  nome: string;
  cpf: string;
  banco: string;
  agencia: number;
  conta: string;
  operacao?: string;
  pix?: string;
  contratos: Contrato[];
}

export type UnsavedAutonomo = Omit<Autonomo, 'id'>


export const AUTONOMO_DEFAULT_VALUE: UnsavedAutonomo = {
  nome: '',
  cpf: '',
  banco: '',
  agencia: 0,
  conta: '',
  contratos: []
}