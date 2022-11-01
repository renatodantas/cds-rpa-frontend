export interface Pagination<T> {
  items: Array<T>;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PageParams {
  page?: string;
  size?: string;
  sort?: string;
  order?: string;
}

export const DEFAULT_PAGINATION: Pagination<any> = {
  items: [],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0
};
