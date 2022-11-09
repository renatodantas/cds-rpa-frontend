export interface Cargo {
  id: number;
  nome: string;
  codigoCentroCusto: string;
  descricaoCentroCusto: string;
}

export type UnsavedCargo = Omit<Cargo, 'id'>;

export const CARGO_DEFAULT_VALUE = Object.freeze<UnsavedCargo>({
  nome: '',
  codigoCentroCusto: '',
  descricaoCentroCusto: ''
});
