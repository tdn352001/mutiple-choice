import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { DataTablePagination } from '@/components/custom/data-table/pagination'
import LoadingPage from '@/components/templates/loading-page'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetUserByExamHistoryQuery } from '@/hooks/services/stats'
import { BaseApiQueryParams, OrderParam } from '@/lib/types/query-params'
import { Exam } from '@/services/exams'
import { UserByExamHistory } from '@/services/stats'
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

interface ExamStatsViewProps {
  exam: Exam
  search?: string
}

const UserByExamTable = ({ exam, search }: ExamStatsViewProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const params = useMemo((): BaseApiQueryParams => {
    const page = pagination.pageIndex + 1
    const perPage = pagination.pageSize
    const sort = sorting[0]?.id || 'id'
    const order = sorting[0]?.desc ? OrderParam.Desc : OrderParam.Asc

    return {
      page,
      per_page: perPage,
      sort_by: sort,
      order_by: order,
      search,
    }
  }, [sorting, pagination, search])

  const { data, isPending } = useGetUserByExamHistoryQuery({
    examId: exam.id,
    params,
  })

  const users = data?.users || []
  const itemsCount = data?.meta.total_items || 0

  const columns: ColumnDef<UserByExamHistory>[] = useMemo(() => {
    const columns: ColumnDef<UserByExamHistory>[] = [
      {
        accessorKey: 'id',
        header: (props) => {
          return <DataTableColumnHeader title="User ID" {...props} />
        },
        cell: ({ row }) => {
          const { id } = row.original
          return <span>{id}</span>
        },
        meta: {
          className: 'hidden md:table-cell',
        },
      },
      {
        accessorKey: 'full_name',
        header: (props) => {
          return <DataTableColumnHeader title="Full name" {...props} />
        },
        cell: ({ row }) => {
          const { full_name } = row.original
          return (
            <div className="flex items-center space-x-2">
              <span className="line-clamp-2">{full_name}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'email',
        header: (props) => {
          return <DataTableColumnHeader title="Email" {...props} />
        },
        cell: ({ row }) => {
          const { email } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{email}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
        enableSorting: false,
      },
      {
        accessorKey: 'nearest_score',
        header: (props) => {
          return <DataTableColumnHeader title="Nearest score" {...props} />
        },
        cell: ({ row }) => {
          const { nearest_score } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{nearest_score}</span>
            </div>
          )
        },

        enableSorting: false,
      },
      {
        accessorKey: 'best_score',
        header: (props) => {
          return <DataTableColumnHeader title="Best score" {...props} />
        },
        cell: ({ row }) => {
          const { best_score } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{best_score}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
        enableSorting: false,
      },
    ]
    return columns
  }, [])

  const table = useReactTable({
    data: users,
    rowCount: itemsCount,
    columns,
    manualPagination: true,
    manualSorting: true,
    autoResetPageIndex: false,
    state: {
      sorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  })

  if (isPending) {
    return (
      <div className="w-full h-full min-h-[50dvh]">
        <LoadingPage />
      </div>
    )
  }

  return (
    <div className="mt-4">
      <Table className="border rounded-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={clsx(header.column.columnDef.meta?.className)}
                    align={header.column.id === 'actions' ? 'right' : 'left'}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={clsx(cell.column.columnDef.meta?.className)}
                    align={cell.column.id === 'actions' ? 'right' : 'left'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center font-medium">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow>
            <TableCell colSpan={columns.length}>
              <DataTablePagination className="justify-end" table={table} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default UserByExamTable
