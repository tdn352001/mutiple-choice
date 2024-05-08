import { DefaultError, MutationOptions, QueryKey, UndefinedInitialDataOptions } from '@tanstack/react-query'

export type AppMutationOptions = Pick<
  MutationOptions,
  'mutationKey' | 'retry' | 'retryDelay' | 'networkMode' | 'meta' | 'gcTime' | '_defaulted'
>

export type AppQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
