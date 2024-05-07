import { useAppSearchParams } from '@/hooks/next'
import { PER_PAGE_OPTIONS } from '@/lib/constants/api'
import { BaseApiQueryParams, OrderParam, SearchParams } from '@/lib/types/query-params'
import { useMemo } from 'react'
import lodash from 'lodash'

export type UseApiQueryOptions = {
  sortProps?: string[]
}

type ParamsUpdater = {
  getParams: () => Required<BaseApiQueryParams>
  setPage: (page: number) => void
  setPerPage: (per_page: number) => void
  setSortBy: (sort_by: string) => void
  setOrderBy: (order_by: OrderParam) => void
  setMany: (records: { [key in SearchParams]?: string | number }) => void
}

export type UseApiQueryReturn = [Required<BaseApiQueryParams>, ParamsUpdater]

export const useApiQuery = (options: UseApiQueryOptions = {}): UseApiQueryReturn => {
  const searchParams = useAppSearchParams()

  return useMemo(() => {
    const params = (function () {
      const search = searchParams.get(SearchParams.Search) || ''

      let page = Number(searchParams.get(SearchParams.Page))
      if (isNaN(page) || page < 1) {
        page = 1
      }

      let per_page = Number(searchParams.get(SearchParams.Limit))
      if (isNaN(per_page) || !PER_PAGE_OPTIONS.includes(per_page)) {
        per_page = PER_PAGE_OPTIONS[0]
      }

      let sort_by = searchParams.get(SearchParams.Sort)

      if (sort_by && options.sortProps && !options.sortProps.includes(sort_by)) {
        sort_by = options.sortProps[0]
      } else {
        sort_by = 'id'
      }

      let order_by = searchParams.get(SearchParams.Order)?.toUpperCase() as OrderParam
      if (order_by !== OrderParam.Desc && order_by !== OrderParam.Asc) {
        order_by = OrderParam.Desc
      }

      return {
        search,
        page,
        per_page,
        sort_by,
        order_by,
      }
    })() as Required<BaseApiQueryParams>

    const createNewParams = (records: { [key in SearchParams]?: string | number }) => {
      const newParams = { ...params, ...records }
      if (!lodash.isEqual(newParams, params)) {
        console.log({ newParams, params, records })
        searchParams.set(newParams)
      }
    }

    const paramsUpdater: ParamsUpdater = {
      getParams: () => params,
      setPage: (page) => {
        createNewParams({ [SearchParams.Page]: page })
      },
      setPerPage: (per_page) => {
        createNewParams({ [SearchParams.Limit]: per_page })
      },
      setSortBy: (sort_by) => {
        createNewParams({ [SearchParams.Sort]: sort_by })
      },
      setOrderBy: (order_by) => {
        createNewParams({ [SearchParams.Order]: order_by })
      },
      setMany: (records) => {
        createNewParams(records)
      },
    }

    return [params, paramsUpdater]
  }, [options.sortProps, searchParams])
}
