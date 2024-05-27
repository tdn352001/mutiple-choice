import ProtectedRoute from "@/components/layout/protected-route";
import UpdateCoursePage from "@/components/pages/dashboard/course/update-course";
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from "@/lib/constants/seo";
import UpdateTopicPage from "@/components/pages/dashboard/topics/update";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <ProtectedRoute admin>
      <UpdateTopicPage id={id} />
    </ProtectedRoute>
  );
};

export const metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.TOPICS.UPDATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.UPDATE,
};

export default Page;
