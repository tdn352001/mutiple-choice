'use client'

import AddMemberFromCSVModal from '@/components/modals/member/add-member-from-csv-modal'
import AddMemberModal from '@/components/modals/member/add-member-modal'
import { DeleteMemberModal } from '@/components/modals/member/delete-member-modal'
import UpdateMemberPasswordModal from '@/components/modals/member/update-member-password-modal'
import UpdateMemberProfileModal from '@/components/modals/member/update-member-profile-modal'
import SearchMembers from '@/components/search-box/search-members'
import MemberTable from '@/components/tables/member-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Modals, useModalStore } from '@/store/modal'
import { Suspense } from 'react'

const MembersPage = () => {
  const openModal = useModalStore((state) => state.openModal)

  const openCreateMemberModal = () => {
    openModal(Modals.CREATE_MEMBER)
  }

  const openCreateMemberFromCsvModal = () => {
    openModal(Modals.CREATE_MEMBER_FROM_CSV)
  }

  return (
    <ScrollArea className="size-full">
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.MEMBERS.HOME}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.MEMBERS.HOME}
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Add member</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="items-center" onClick={openCreateMemberFromCsvModal}>
                  From Csv
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="items-center" onClick={openCreateMemberModal}>
                  Manually
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <div>
          <Suspense>
            <SearchMembers />
          </Suspense>
          <MemberTable />
        </div>
        <UpdateMemberPasswordModal />
        <UpdateMemberProfileModal />
        <DeleteMemberModal />
        <AddMemberModal />
        <AddMemberFromCSVModal />
      </Container>
    </ScrollArea>
  )
}

export default MembersPage
