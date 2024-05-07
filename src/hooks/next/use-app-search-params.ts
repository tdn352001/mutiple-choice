import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useAppSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return {
    ...searchParams,
    get: (name: string, defaultValue?: string) => {
      const value = searchParams.get(name)
      return value ?? defaultValue
    },
    update: (name: string, value: string | number) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set(name, value.toString())
      router.push(pathname + '?' + params.toString())
    },
    delete: (name: string, replace?: boolean) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.delete(name)
      if (replace) {
        router.replace(pathname + '?' + params.toString())
      } else router.push(pathname + '?' + params.toString())
    },
    set: (records: Record<string, string | number>) => {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(records)) {
        if (value) {
          params.set(key, value.toString())
        }
      }
      router.push(pathname + '?' + params.toString())
    },
  }
}
