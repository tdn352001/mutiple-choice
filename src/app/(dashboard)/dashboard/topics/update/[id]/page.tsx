import ProtectedRoute from "@/components/layout/protected-route";
import UpdateCoursePage from "@/components/pages/dashboard/course/update-course";
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from "@/lib/constants/seo";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <ProtectedRoute admin>
      <UpdateCoursePage id={id} />
    </ProtectedRoute>
  );
};

export const metadata = {
  title: DOCUMENT_TITLES.DASHBOARD.TOPICS.UPDATE,
  description: DOCUMENTS_DESCRIPTIONS.DASHBOARD.TOPICS.UPDATE,
};

export default Page;
