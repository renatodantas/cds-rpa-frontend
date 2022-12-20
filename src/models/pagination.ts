export const DEFAULT_PAGE = 1;
export const DEFAULT_SIZE = 10;
export const DEFAULT_ORDER = true;

export interface PaginationInput<T> {
  page: number;
  size: number;
  sort: keyof T;
  ascending: boolean;
}

export const DEFAULT_PAGE_PARAMS: PaginationInput<never> = {
  page: DEFAULT_PAGE,
  size: DEFAULT_SIZE,
  ascending: DEFAULT_ORDER,
  sort: ''
};

export interface PaginationOutput<T> {
  items: Array<T>;
  // page: number;
  // pageSize: number;
  // pageCount: number;
  total: number;
}

export const DEFAULT_PAGINATION: PaginationOutput<never> = {
  items: [],
  // page: 0,
  // pageSize: 10,
  // pageCount: 0,
  total: 0
};

export function getPaginationRange(
  page: number,
  size: number
): {
  from: number;
  to: number;
} {
  // page=1, size=10 ==> from 0 to 9
  // page=2, size=10 ==> from 10 to 19
  const from = page * size - 10;
  const to = page * size - 1;
  return { from, to };
}
