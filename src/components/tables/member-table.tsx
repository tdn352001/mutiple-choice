import { DataTableColumnHeader } from '@/components/custom/data-table/column-header'
import { DataTablePagination } from '@/components/custom/data-table/pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetMembersSuspenseQuery, useUpdateMemberProfileMutation } from '@/hooks/services/members'
import { useApiQuery } from '@/hooks/use-api-query'
import { MEMBER_SORTABLE_PROPS } from '@/lib/constants/api'
import { dynamicRouters } from '@/lib/constants/routers'
import { SearchParams } from '@/lib/types/query-params'
import { Member } from '@/services/members'
import { Modals, useOpenModal } from '@/store/modal'
import { useUserStore } from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
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
import { CheckCircle, Edit, Key, MoreHorizontal, ShieldBan, Trash, User2 } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

const MemberRoleDropdownItem = ({ member }: { member: Member }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateMember } = useUpdateMemberProfileMutation(member.id)

  const handleUpdateProfile = () => {
    updateMember({ ...member, is_admin: !member.is_admin }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['members'],
      })
    })
  }

  return (
    <DropdownMenuItem onClick={handleUpdateProfile}>
      <User2 className="mr-2 h-4 w-4" />
      <span>
        Set as <span>{member.is_admin ? 'member' : 'admin'}</span>
      </span>
    </DropdownMenuItem>
  )
}

const MemberActiveStateDropdownItem = ({ member }: { member: Member }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateMember } = useUpdateMemberProfileMutation(member.id)

  const handleUpdateProfile = () => {
    updateMember({ ...member, active: !member.active }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['members'],
      })
    })
  }

  return (
    <DropdownMenuItem onClick={handleUpdateProfile}>
      {member.active ? (
        <>
          <ShieldBan className="mr-2 h-4 w-4" />
          <span>Inactive</span>
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          <span>Active</span>
        </>
      )}
    </DropdownMenuItem>
  )
}

const MemberTable = () => {
  const [params, paramsUpdater] = useApiQuery({ sortProps: MEMBER_SORTABLE_PROPS })

  const { data } = useGetMembersSuspenseQuery(params)

  const members = data?.users || []

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

  const openDeleteMemberModal = useOpenModal(Modals.DELETE_MEMBER)
  const openUpdateMemberProfileModal = useOpenModal(Modals.UPDATE_MEMBER_PROFILE)
  const openUpdateMemberPasswordModal = useOpenModal(Modals.UPDATE_MEMBER_PASSWORD)

  const user = useUserStore((state) => state.user)

  const columns: ColumnDef<Member>[] = useMemo(() => {
    const columns: ColumnDef<Member>[] = [
      {
        accessorKey: 'full_name',
        header: (props) => {
          return <DataTableColumnHeader title="Full name" {...props} />
        },
        cell: ({ row }) => {
          const { id, full_name } = row.original
          return (
            <div className="flex items-center space-x-2">
              <Link className="line-clamp-2" href={dynamicRouters.memberById(id)}>
                {full_name}
              </Link>
            </div>
          )
        },
        meta: {
          className: 'max-w-[300px]',
        },
      },
      {
        accessorKey: 'email',
        header: (props) => {
          return <DataTableColumnHeader title="Email" {...props} />
        },
        cell: ({ row }) => {
          const { id, email } = row.original
          return (
            <div className="flex items-center space-x-2">
              <Link className="line-clamp-2" href={dynamicRouters.memberById(id)}>
                {email}
              </Link>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell max-w-[300px]',
        },
      },
      {
        accessorKey: 'is_admin',
        header: (props) => {
          return <DataTableColumnHeader title="Role" {...props} />
        },
        cell: ({ row }) => {
          const { is_admin } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <span className="block whitespace-nowrap first-letter:uppercase">{is_admin ? 'Admin' : 'Member'}</span>
            </div>
          )
        },
        meta: {
          className: 'hidden md:table-cell',
        },
        enableSorting: false,
      },
      {
        accessorKey: 'active',
        header: (props) => {
          return <DataTableColumnHeader title="Status" {...props} />
        },
        cell: ({ row }) => {
          const { active } = row.original
          return (
            <div className="min-w-28 flex items-center space-x-2">
              <Badge variant={active ? 'success' : 'destructive'}>{active ? 'Active' : 'Inactive'}</Badge>
            </div>
          )
        },
        meta: {
          className: 'hidden lg:table-cell',
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
                <DropdownMenuItem onClick={() => openUpdateMemberProfileModal({ member: row.original })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Update profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openUpdateMemberPasswordModal({ member: row.original })}>
                  <Key className="mr-2 h-4 w-4" />
                  <span>Update password</span>
                </DropdownMenuItem>
                {user?.id !== row.original.id && (
                  <>
                    <MemberRoleDropdownItem member={row.original} />
                    <MemberActiveStateDropdownItem member={row.original} />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive/90"
                      onClick={() => openDeleteMemberModal({ member: row.original })}
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
    ]

    return columns
  }, [openDeleteMemberModal, openUpdateMemberPasswordModal, openUpdateMemberProfileModal, user?.id])

  const table = useReactTable({
    data: members,
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

export default MemberTable
