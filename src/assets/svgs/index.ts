import logo from './logo.svg'
export const SVGIcons = {
  logo,
} as const

export type SVGIcon = keyof typeof SVGIcons
