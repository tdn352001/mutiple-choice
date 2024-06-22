import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import LoadingPage from '@/components/templates/loading-page'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetMemberQuizzesQuery } from '@/hooks/services/members'
import { dynamicRouters } from '@/lib/constants/routers'
import { QuizHistory } from '@/services/quiz'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import clsx from 'clsx'
import moment from 'moment'
import Link from 'next/link'
import { useMemo } from 'react'

interface QuizHistoryTableProps {
  className?: string
  examId: string | number
  memberId: string | number
}

const MemberQuizHistoryTable = ({ examId, memberId }: QuizHistoryTableProps) => {
  const { data } = useGetMemberQuizzesQuery({
    exam_id: examId,
    user_id: memberId,
  })

  const quizHistory = data?.quizzes || []

  const columns: ColumnDef<QuizHistory>[] = useMemo(() => {
    const columns: ColumnDef<QuizHistory>[] = [
      {
        accessorKey: 'attempts',
        header: (props) => {
          return <DataTableColumnHeader title="Attemps" {...props} />
        },
        cell: ({ row }) => {
          const { attempts } = row.original
          return <span>{attempts}</span>
        },
        enableSorting: false,
      },
      {
        accessorKey: 'start_time',
        header: (props) => {
          return <DataTableColumnHeader title="Start time" {...props} />
        },
        cell: ({ row }) => {
          return <span className="min-w-28 block">{moment(row.original.start_time).format('DD/MM/YYYY HH:mm:ss')}</span>
        },
        meta: {
          className: 'hidden md:table-cell',
        },
        enableSorting: false,
      },
      {
        accessorKey: 'end_time',
        header: (props) => {
          return <DataTableColumnHeader title="End time" {...props} />
        },
        cell: ({ row }) => {
          return <span className="min-w-28 block ">{moment(row.original.end_time).format('DD/MM/YYYY HH:mm:ss')}</span>
        },
        meta: {
          className: 'hidden md:table-cell max-w-[200px] lg:max-w-[320px]',
        },
        enableSorting: false,
      },
      {
        accessorKey: 'score',
        header: (props) => {
          return <DataTableColumnHeader title="Score" {...props} />
        },
        cell: ({ row }) => {
          return <span>{row.original.score}</span>
        },

        enableSorting: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <Link
              className={buttonVariants({ variant: 'link', className: 'text-sky-500' })}
              href={dynamicRouters.quizResult(row.original.id)}
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
    data: quizHistory,
    rowCount: quizHistory.length,
    columns,
    manualPagination: true,
    manualSorting: true,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  })

  if (quizHistory.length === 0) {
    return <LoadingPage />
  }

  return (
    <div className="mt-4 w-full">
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

export default MemberQuizHistoryTable
