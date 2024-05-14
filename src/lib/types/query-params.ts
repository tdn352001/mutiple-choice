export enum OrderParam {
  Desc = 'DESC',
  Asc = 'ASC',
}

export type BaseApiQueryParams<T = string> = {
  search?: string
  page?: number
  per_page?: number
  sort_by?: T
  order_by?: OrderParam
}

export enum SearchParams {
  Search = 'search',
  Page = 'page',
  Limit = 'per_page',
  Sort = 'sort_by',
  Order = 'order_by',
}

export type PageParams = {
  [SearchParams.Search]?: string
  [SearchParams.Page]?: string
  [SearchParams.Limit]?: string
  [SearchParams.Sort]?: string
  [SearchParams.Order]?: string
}
