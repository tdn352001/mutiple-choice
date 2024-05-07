import SearchBox from '@/components/custom/search-box'
import { useAppSearchParams } from '@/hooks/next'
import { SearchParams } from '@/lib/types/query-params'
import React from 'react'

const SearchCourse = () => {
  const searchParams = useAppSearchParams()

  const keyword = searchParams.get(SearchParams.Search) || ''

  const handleSearch = (value: string) => {
    searchParams.set({
      [SearchParams.Search]: value,
      [SearchParams.Page]: '1',
    })
  }

  return <SearchBox value={keyword} onChange={handleSearch} onSubmit={handleSearch} />
}

export default SearchCourse
