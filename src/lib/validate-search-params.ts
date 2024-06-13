import { PER_PAGE_OPTIONS } from '@/lib/constants/api'
import { BaseApiQueryParams, OrderParam, PageParams, SearchParams } from '@/lib/types/query-params'

export interface ValidateSearchParamsOptions {
  sortProps?: string[]
}

export const validateSearchParams = (searchParams: PageParams, options: ValidateSearchParamsOptions = {}) => {
  const search = searchParams[SearchParams.Search] || ''

  let page = Number(searchParams[SearchParams.Page])
  if (isNaN(page) || page < 1) {
    page = 1
  }

  let per_page = Number(searchParams[SearchParams.Limit])
  if (isNaN(per_page) || !PER_PAGE_OPTIONS.includes(per_page)) {
    per_page = PER_PAGE_OPTIONS[0]
  }

  let sort_by = searchParams[SearchParams.Sort]

  if (!sort_by || !options.sortProps?.includes(sort_by)) {
    sort_by = options.sortProps ? options.sortProps[0] : 'id'
  }

  let order_by = searchParams[SearchParams.Order]?.toUpperCase() as OrderParam
  if (order_by !== OrderParam.Desc && order_by !== OrderParam.Asc) {
    order_by = OrderParam.Desc
  }

  return {
    search,
    page,
    per_page,
    sort_by,
    order_by,
  } as Required<BaseApiQueryParams>
}
