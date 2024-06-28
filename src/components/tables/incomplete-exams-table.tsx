import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetIncompleteExamsQuery } from '@/hooks/services/user/use-get-incomplete-exam-query'
import { dynamicRouters } from '@/lib/constants/routers'
import { Exam } from '@/services/exams'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'

const IncompleteExamsTable = () => {
  const { data } = useGetIncompleteExamsQuery()

  const exams = data || []

  const itemsCount = exams.length

  const columns: ColumnDef<Exam>[] = useMemo(() => {
    const columns: ColumnDef<Exam>[] = [
      {
        accessorKey: 'exam_name',
        header: (props) => {
          return <DataTableColumnHeader title="Exam name" {...props} />
        },
        cell: ({ row }) => {
          const { id, exam_name } = row.original
          return (
            <div className="flex items-center space-x-2">
              <Link className="line-clamp-2" href={dynamicRouters.examById(id)}>
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
        accessorKey: 'number_of_questions',
        header: (props) => {
          return <DataTableColumnHeader title="Questions" {...props} />
        },
        cell: ({ row }) => {
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap">{row.original.number_of_questions}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden xl:table-cell',
        },
      },
      {
        accessorKey: 'time_limit',
        header: (props) => {
          return <DataTableColumnHeader title="Time limit (min)" {...props} />
        },
        cell: ({ row }) => {
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap first-letter:uppercase">{row.original.time_limit}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden lg:table-cell',
        },
      },

      {
        id: 'actions',
        cell: ({ row }) => {
          const { id } = row.original
          return (
            <Link
              className={buttonVariants({ variant: 'link', className: 'text-sky-500' })}
              href={dynamicRouters.examById(id)}
            >
              View
            </Link>
          )
        },
      },
    ]
    return columns
  }, [])

  const table = useReactTable({
    data: exams,
    rowCount: itemsCount,
    columns,
    manualPagination: true,
    manualSorting: true,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
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
      </Table>
    </div>
  )
}

export default IncompleteExamsTable
