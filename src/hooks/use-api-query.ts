import { useAppSearchParams } from '@/hooks/next'
import { BaseApiQueryParams, OrderParam, SearchParams } from '@/lib/types/query-params'
import { ValidateSearchParamsOptions, validateSearchParams } from '@/lib/validate-search-params'
import lodash from 'lodash'
import { useMemo } from 'react'

export type UseApiQueryOptions = ValidateSearchParamsOptions

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
      return validateSearchParams(
        {
          [SearchParams.Search]: searchParams.get(SearchParams.Search),
          [SearchParams.Page]: searchParams.get(SearchParams.Page),
          [SearchParams.Limit]: searchParams.get(SearchParams.Limit),
          [SearchParams.Sort]: searchParams.get(SearchParams.Sort),
          [SearchParams.Order]: searchParams.get(SearchParams.Order),
        },
        options
      )
    })()

    const createNewParams = (records: { [key in SearchParams]?: string | number }) => {
      const newParams = { ...params, ...records }
      if (!lodash.isEqual(newParams, params)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.sortProps, searchParams])
}
