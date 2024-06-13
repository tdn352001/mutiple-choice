import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { DataTablePagination } from '@/components/custom/data-table/pagination'
import LoadingPage from '@/components/templates/loading-page'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetQuestionsQuery } from '@/hooks/services/questions'
import { BaseApiQueryParams, OrderParam } from '@/lib/types/query-params'
import { Question } from '@/services/questions'
import { Modals, useOpenModal } from '@/store/modal'
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { Edit, Eye, Info, MoreHorizontal, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'

interface QuestionTableProps {
  examId?: string | number
  search?: string
}

const QuestionTable = ({ examId, search }: QuestionTableProps) => {
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
      search: search,
    }
  }, [search, sorting, pagination])

  const { data, isPending } = useGetQuestionsQuery({
    examId,
    params,
  })

  const questions = data?.questions || []

  const itemsCount = data?.meta?.total_items || 0

  const openDetailModal = useOpenModal(Modals.VIEW_QUESTION)
  const openEditModal = useOpenModal(Modals.EDIT_QUESTION)
  const openDeleteModal = useOpenModal(Modals.DELETE_QUESTION)

  const columns: ColumnDef<Question>[] = useMemo(() => {
    const columns: ColumnDef<Question>[] = [
      {
        accessorKey: 'question',
        header: (props) => {
          return <DataTableColumnHeader title="Question" {...props} />
        },
        cell: ({ row }) => {
          const { question } = row.original
          return (
            <div className="flex items-center space-x-2">
              <span className="line-clamp-2">{question}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'type',
        header: (props) => {
          return <DataTableColumnHeader title="Type" {...props} />
        },
        cell: ({ row }) => {
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap first-letter:uppercase">{row.original.type}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
      },
      {
        accessorKey: 'image',
        header: (props) => {
          return <DataTableColumnHeader title="Image" {...props} />
        },
        cell: ({ row }) => {
          const image = row.original.image
          if (image) {
          }

          return (
            <div className="min-w-28 flex items-center space-y-2">
              <span className="line-clamp-1">{image || '--'}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
        enableSorting: false,
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
                <DropdownMenuItem onClick={() => openDetailModal({ question: row.original })}>
                  <Info className="mr-2 h-4 w-4" />
                  <span>Detail</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditModal({ question: row.original })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive/90"
                  onClick={() => openDeleteModal({ question: row.original, examId })}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]

    return columns
  }, [openDetailModal, openEditModal, openDeleteModal, examId])

  const table = useReactTable({
    data: questions,
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
    return <LoadingPage />
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

export default QuestionTable
