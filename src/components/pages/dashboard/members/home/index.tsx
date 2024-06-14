'use client'

import ProtectedRoute from '@/components/layout/protected-route'
import { DeleteMemberModal } from '@/components/modals/member/delete-member-modal'
import UpdateMemberPasswordModal from '@/components/modals/member/update-member-password-modal'
import UpdateMemberProfileModal from '@/components/modals/member/update-member-profile-modal'
import SearchMembers from '@/components/search-box/search-members'
import MemberTable from '@/components/tables/member-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const MembersPage = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <ProtectedRoute admin>
      <ScrollArea className="size-full">
        <Container>
          <Heading
            title={DOCUMENT_TITLES.DASHBOARD.MEMBERS.HOME}
            description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.MEMBERS.HOME}
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
        </Container>
      </ScrollArea>
    </ProtectedRoute>
  )
}

export default MembersPage
