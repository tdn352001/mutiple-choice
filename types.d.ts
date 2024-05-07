import '@tanstack/react-table'

declare global {
  interface Window {
    stage?: any
  }
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    mobile?: boolean
  }
}

export {}
