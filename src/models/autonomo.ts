export interface Autonomo {
  id: number;
  nome: string;
  cpf: string;
  banco?: string | null;
  agencia?: number | null;
  conta?: string | null;
  operacao?: string | null;
  pix?: string | null;
}

export type UnsavedAutonomo = Omit<Autonomo, 'id'>;

export const AUTONOMO_DEFAULT_VALUE: UnsavedAutonomo = Object.freeze({
  nome: '',
  cpf: ''
});
