export interface PageParams<T> {
  page: number;
  size: number;
  sort?: keyof T;
  ascending: boolean;
}

export const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 10;
export const DEFAULT_ORDER = true;

export const DEFAULT_PAGE_PARAMS: PageParams<unknown> = {
  page: DEFAULT_PAGE,
  size: DEFAULT_SIZE,
  ascending: DEFAULT_ORDER
};

export function getPaginationRange(
  page: number,
  size: number
): {
  from: number;
  to: number;
} {
  const limit = size ? size : DEFAULT_SIZE;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;
  return { from, to };
}
