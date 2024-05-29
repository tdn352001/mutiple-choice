import {
  DefaultError,
  MutationOptions,
  NotifyOnChangeProps,
  QueryKey,
  UndefinedInitialDataOptions,
} from '@tanstack/react-query'

export type AppMutationOptions = Pick<
  MutationOptions,
  'mutationKey' | 'retry' | 'retryDelay' | 'networkMode' | 'meta' | 'gcTime' | '_defaulted'
>

export type AppQueryOptions = {
  enabled?: boolean
  staleTime?: number
  refetchInterval?: number | false | ((query: any) => number | false | undefined)
  refetchIntervalInBackground?: boolean
  refetchOnWindowFocus?: boolean | 'always' | ((query: any) => boolean | 'always')
  refetchOnReconnect?: boolean | 'always' | ((query: any) => boolean | 'always')
  refetchOnMount?: boolean | 'always' | ((query: any) => boolean | 'always')
  retryOnMount?: boolean
  notifyOnChangeProps?: NotifyOnChangeProps
  throwOnError?: any
}

export type AppQueryOptionsV2<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Partial<UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>>
