
export interface Cargo {
  id: number;
  nome: string;
  centroCustoCodigo: string;
  centroCustoDescricao: string;
}

export type UnsavedCargo = Omit<Cargo, 'id'>

export const CARGO_DEFAULT_VALUE: UnsavedCargo = {
  nome: '',
  centroCustoCodigo: '',
  centroCustoDescricao: ''
}