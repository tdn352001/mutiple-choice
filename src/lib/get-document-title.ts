import { nameRouters, routers } from '@/lib/constants/routers'
import { LeafType } from '@/lib/types/type'

type GetDocumentTileOptions = {
  pathname: LeafType<typeof routers> | string
  fallback?: string
}

type GetDocumentTileResult = {
  title?: string
}

export const getDocumentTitle = ({ pathname, fallback }: GetDocumentTileOptions) => {
  const title = nameRouters[pathname as keyof typeof nameRouters]

  return title ?? fallback
}
