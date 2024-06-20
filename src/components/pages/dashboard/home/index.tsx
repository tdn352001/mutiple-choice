import StatsCards from '@/components/pages/dashboard/home/cards'
import CoursesCard from '@/components/pages/dashboard/home/courses'
import MembersCard from '@/components/pages/dashboard/home/members'
import Container from '@/components/templates/container'
import { ScrollArea } from '@/components/ui/scroll-area'

const DashboardPage = () => {
  return (
    <ScrollArea className="size-full">
      <Container>
        <StatsCards />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <CoursesCard />
          <MembersCard />
        </div>
      </Container>
    </ScrollArea>
  )
}

export default DashboardPage
