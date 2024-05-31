import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { DataTablePagination } from '@/components/custom/data-table/pagination'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetExamsByTopicSuspenseQuery } from '@/hooks/services/exam'
import { useApiQuery } from '@/hooks/use-api-query'
import { TOPICS_SORTABLE_PROPS } from '@/lib/constants/api'
import { dynamicRouters } from '@/lib/constants/routers'
import { SearchParams } from '@/lib/types/query-params'
import { Exam } from '@/services/exams'
import { Topic } from '@/services/topics'
import { Modals, useOpenModal } from '@/store/modal'
import { useUserStore } from '@/store/user'
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
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

interface ExamsTableProps {
  topic: Topic
}

const ExamsTable = ({ topic }: ExamsTableProps) => {
  const [params, paramsUpdater] = useApiQuery({
    sortProps: TOPICS_SORTABLE_PROPS,
  })
  const isAdmin = useUserStore((state) => state.user?.is_admin)

  const { data } = useGetExamsByTopicSuspenseQuery(topic.id, params)

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

  const openModal = useOpenModal(Modals.DELETE_TOPIC)

  const columns: ColumnDef<Exam>[] = useMemo(
    () => [
      {
        accessorKey: 'exam_name',
        header: (props) => {
          return <DataTableColumnHeader title="Name" {...props} />
        },
        cell: ({ row }) => {
          const { id, exam_name } = row.original
          return (
            <div className="flex items-center space-x-2">
              <Link className="line-clamp-2" href={dynamicRouters.courseById(id)}>
                {exam_name}
              </Link>
            </div>
          )
        },
      },
      {
        accessorKey: 'exam_code',
        header: (props) => {
          return <DataTableColumnHeader title="Code" {...props} />
        },
        cell: ({ row }) => {
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{row.getValue('exam_code')}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal size={16} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-32" align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={dynamicRouters.updateTopic(row.original.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive/90"
                      // onClick={() => openModal({ : row.original })}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [isAdmin]
  )

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

export default ExamsTable
