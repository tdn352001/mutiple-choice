'use client'

import { CustomLink } from '@/components/custom/link'
import { DeleteExamModal } from '@/components/modals/exam/delete-exam-modal'
import SearchExam from '@/components/search-box/search-exam'
import ExamsTable from '@/components/tables/exams-table'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const ExamsPage = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <ScrollArea className="w-full h-full">
      <Container>
        <Heading
          title={DOCUMENT_TITLES.DASHBOARD.EXAMS.HOME}
          description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.EXAMS.HOME}
          action={
            isAdmin && (
              <CustomLink href={routers.createExam} icon="Plus">
                Create Exam
              </CustomLink>
            )
          }
        />
        <div>
          <Suspense>
            <SearchExam />
          </Suspense>
          <ExamsTable />
        </div>
        <DeleteExamModal />
      </Container>
    </ScrollArea>
  )
}

export default ExamsPage
