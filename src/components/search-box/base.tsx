import SearchBoxPrimitive from '@/components/custom/search-box'
import { useAppSearchParams } from '@/hooks/next'
import { SearchParams } from '@/lib/types/query-params'

interface SearchBoxApiProps {
  placeholder: string
}

const SearchBoxApi = ({ placeholder }: SearchBoxApiProps) => {
  const searchParams = useAppSearchParams()

  const keyword = searchParams.get(SearchParams.Search) || ''

  const handleSearch = (value: string) => {
    searchParams.set({
      [SearchParams.Search]: value,
      [SearchParams.Page]: '1',
    })
  }

  return (
    <SearchBoxPrimitive value={keyword} onChange={handleSearch} onSubmit={handleSearch} placeholder={placeholder} />
  )
}

export default SearchBoxApi
