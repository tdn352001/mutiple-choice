import SearchBoxPrimitive from '@/components/custom/search-box'

interface SearchImagesProps {
  search: string
  setSearch: (search: string) => void
}

const SearchImages = ({ search, setSearch }: SearchImagesProps) => {
  return <SearchBoxPrimitive value={search} onChange={setSearch} onSubmit={setSearch} placeholder="Search images" />
}

export default SearchImages
