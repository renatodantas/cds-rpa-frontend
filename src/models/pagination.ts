export interface Pagination<T> {
  items: Array<T>;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export const DEFAULT_PAGINATION: Pagination<unknown> = {
  items: [],
  page: 0,
  pageSize: 10,
  pageCount: 0,
  total: 0
};
