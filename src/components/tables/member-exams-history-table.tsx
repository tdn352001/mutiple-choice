import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { DataTablePagination } from '@/components/custom/data-table/pagination'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetMemberExamHistoryQuery } from '@/hooks/services/members'
import { useApiQuery } from '@/hooks/use-api-query'
import { EXAM_HISTORY_SORTABLE_PROPS } from '@/lib/constants/api'
import { dynamicRouters } from '@/lib/constants/routers'
import { SearchParams } from '@/lib/types/query-params'
import { ExamHistory } from '@/services/user'
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

interface ExamsHistoryTableProps {
  memberId: string | number
}

const MemberExamHistoryTable = ({ memberId }: ExamsHistoryTableProps) => {
  const [params, paramsUpdater] = useApiQuery({
    sortProps: EXAM_HISTORY_SORTABLE_PROPS,
  })

  const { data } = useGetMemberExamHistoryQuery({ memberId, params })

  const exams = data?.exams || []

  const page = params.page
  const perPage = params.per_page
  const itemsCount = data?.meta.total_items || 0

  const sorting = useMemo((): SortingState => {
    return [
      {
        id: params.sort_by,
        desc: params.order_by === 'DESC',
      },
    ]
  }, [params.sort_by, params.order_by])

  const setSorting: OnChangeFn<SortingState> = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (typeof updaterOrValue === 'function') {
        const newSorting = updaterOrValue(sorting)
        paramsUpdater.setMany({
          [SearchParams.Sort]: newSorting[0].id,
          [SearchParams.Order]: newSorting[0].desc ? 'DESC' : 'ASC',
        })
      } else {
        paramsUpdater.setMany({
          [SearchParams.Sort]: updaterOrValue[0].id,
          [SearchParams.Order]: updaterOrValue[0].desc ? 'DESC' : 'ASC',
        })
      }
    },
    [paramsUpdater, sorting]
  )

  const pagination = useMemo((): PaginationState => {
    return {
      pageIndex: page - 1,
      pageSize: perPage,
    }
  }, [page, perPage])

  const setPagination: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === 'function') {
        const newPagination = updaterOrValue(pagination)
        paramsUpdater.setMany({
          [SearchParams.Page]: newPagination.pageIndex + 1,
          [SearchParams.Limit]: newPagination.pageSize,
        })
      } else {
        paramsUpdater.setMany({
          [SearchParams.Page]: updaterOrValue.pageIndex + 1,
          [SearchParams.Limit]: updaterOrValue.pageSize,
        })
      }
    },
    [pagination, paramsUpdater]
  )

  const columns: ColumnDef<ExamHistory>[] = useMemo(() => {
    const columns: ColumnDef<ExamHistory>[] = [
      {
        accessorKey: 'exam_name',
        header: (props) => {
          return <DataTableColumnHeader title="Exam name" {...props} />
        },
        cell: ({ row }) => {
          const { id, exam_name } = row.original
          return (
            <div className="flex items-center space-x-2">
              <Link className="line-clamp-2" href={dynamicRouters.memberQuiz(memberId, id)}>
                {exam_name}
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'exam_code',
        header: (props) => {
          return <DataTableColumnHeader title="Exam code" {...props} />
        },
        cell: ({ row }) => {
          const { exam_code } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{exam_code}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
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
        meta: {
          className: 'hidden md:table-cell',
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
        enableSorting: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const { id } = row.original
          return (
            <Link
              className={buttonVariants({ variant: 'link', className: 'text-sky-500' })}
              href={dynamicRouters.memberQuiz(memberId, id)}
            >
              View
            </Link>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
      },
    ]
    return columns
  }, [memberId])

  const table = useReactTable({
    data: exams,
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

export default MemberExamHistoryTable
