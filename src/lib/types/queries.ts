import { MutationOptions } from '@tanstack/react-query'

export type AppMutationOptions = Pick<
  MutationOptions,
  'mutationKey' | 'retry' | 'retryDelay' | 'networkMode' | 'meta' | 'gcTime' | '_defaulted'
>

// import { UseMutationOptions } from '@tanstack/react-query'

// export type AppMutationOptions<TData = unknown, TError = Error, TVariables = void, TContext = unknown> = Omit<
//   UseMutationOptions<TData, TError, TVariables, TContext>,
//   'mutationFn' | 'mutationKey'
// >
