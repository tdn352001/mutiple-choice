export type LeafType<T> = T extends object ? LeafType<T[keyof T]> : T
