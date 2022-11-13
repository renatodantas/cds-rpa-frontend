export interface Cargo {
  id: number;
  nome: string;
  codigoCentroCusto: string | null;
  descricaoCentroCusto: string | null;
  createdAt?: string;
}

export type UnsavedCargo = Omit<Cargo, 'id'>;

export const CARGO_DEFAULT_VALUE = Object.freeze<UnsavedCargo>({
  nome: '',
  codigoCentroCusto: '',
  descricaoCentroCusto: ''
});
