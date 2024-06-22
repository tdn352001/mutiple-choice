import SearchBoxPrimitive from '@/components/custom/search-box'

interface SearchQuestionsProps {
  search: string
  setSearch: (search: string) => void
}

const SearchUserByExam = ({ search, setSearch }: SearchQuestionsProps) => {
  return (
    <SearchBoxPrimitive
      value={search}
      onChange={setSearch}
      onSubmit={setSearch}
      placeholder="Search users by full name or email"
    />
  )
}

export default SearchUserByExam
