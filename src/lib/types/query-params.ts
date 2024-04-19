export enum OrderParam {
  Desc = 'desc',
  Asc = 'asc',
}

export type BaseApiQueryParams<T = string> = {
  page?: number
  per_page?: number
  order_by: OrderParam
  sort_by: T
}

export type QueryParams<T = string> = {
  page?: number
  perPage?: number
  orderBy: OrderParam
  sortBy: T
}
