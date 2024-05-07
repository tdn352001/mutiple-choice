export enum OrderParam {
  Desc = 'DESC',
  Asc = 'ASC',
}

export type BaseApiQueryParams<T = string> = {
  search?: string
  page?: number
  per_page?: number
  order_by?: OrderParam
  sort_by?: T
}

export enum SearchParams {
  Search = 'search',
  Sort = 'sort_by',
  Page = 'page',
  Order = 'order_by',
  Limit = 'per_page',
}
