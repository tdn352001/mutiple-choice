import CourseDetailPage from "@/components/pages/dashboard/course/course-detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseService } from "@/services/courses";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  return <CourseDetailPage id={id} />;
};

export const generateMetadata = async ({
  params: { id },
}: PageProps): Promise<Metadata> => {
  try {
    const res = await courseService.getCourseById(id);
    const course = res.data;

    return {
      title: course?.course_name,
      description: course?.description,
    };
  } catch (error) {
    return notFound();
  }
};

export default Page;
