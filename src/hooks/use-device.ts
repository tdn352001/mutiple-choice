import { DESKTOP_WIDTH, TABLET_WIDTH } from '@/lib/constants/devices'
import { useMediaQuery } from 'usehooks-ts'

export type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const mobileMediaQuery = `(max-width: ${TABLET_WIDTH - 1}px)`
const tabletMediaQuery = `(min-width: ${TABLET_WIDTH}px) and (max-width: ${DESKTOP_WIDTH - 1}px)`
const desktopMediaQuery = `(min-width: ${DESKTOP_WIDTH}px)`

export const useIsDesktopMediaQuery = (
  options: UseMediaQueryOptions = { defaultValue: true, initializeWithValue: false }
) => {
  return useMediaQuery(desktopMediaQuery, options)
}

export const useIsTabletMediaQuery = (options: UseMediaQueryOptions = { initializeWithValue: false }) => {
  return useMediaQuery(tabletMediaQuery, options)
}

export const useIsMobileMediaQuery = (options: UseMediaQueryOptions = { initializeWithValue: false }) => {
  return useMediaQuery(mobileMediaQuery, options)
}
