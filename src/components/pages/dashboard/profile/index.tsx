'use client'

import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import ExamHistory from './exam-history'

const ProfilePage = () => {
  const user = useUserStore((state) => state.user)

  return (
    <ScrollArea className="size-full">
      <Container>
        <Heading title={DOCUMENT_TITLES.DASHBOARD.PROFILE.HOME} />
        <div className="pt-10 space-y-8">
          <div>
            <p className="text-lg ">
              <span className="font-medium">Name: </span>
              <span>{user?.full_name}</span>
            </p>
            <p className="text-lg ">
              <span className="font-medium">Email: </span>
              <span>{user?.email}</span>
            </p>
          </div>
          <Separator />
          <ExamHistory />
        </div>
      </Container>
    </ScrollArea>
  )
}

export default ProfilePage
