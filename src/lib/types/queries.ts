import { MutationOptions } from '@tanstack/react-query'

export type AppMutationOptions = Pick<
  MutationOptions,
  'mutationKey' | 'retry' | 'retryDelay' | 'networkMode' | 'meta' | 'gcTime' | '_defaulted'
>
