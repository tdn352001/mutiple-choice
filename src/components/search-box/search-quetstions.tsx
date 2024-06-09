import SearchBoxPrimitive from '@/components/custom/search-box'

interface SearchQuestionsProps {
  search: string
  setSearch: (search: string) => void
}

const SearchQuestions = ({ search, setSearch }: SearchQuestionsProps) => {
  return <SearchBoxPrimitive value={search} onChange={setSearch} onSubmit={setSearch} placeholder="Search questions" />
}

export default SearchQuestions
