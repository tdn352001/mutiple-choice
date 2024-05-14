export const getSearchParams = () => {
  const IS_SERVER = typeof window === 'undefined'
  return IS_SERVER ? new URLSearchParams() : new URLSearchParams(window.location.search)
}
