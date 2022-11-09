export interface Autonomo {
  id: number;
  nome: string;
  cpf: string;
  banco: string;
  agencia: number;
  conta: string;
  operacao?: string;
  pix?: string;
}

export type UnsavedAutonomo = Omit<Autonomo, 'id'>;

export const AUTONOMO_DEFAULT_VALUE: UnsavedAutonomo = Object.freeze({
  nome: '',
  cpf: '',
  banco: '',
  agencia: 0,
  conta: ''
});
