import TopicDetailPage from "@/components/pages/dashboard/topics/topic-detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicService } from "@/services/topics";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  return <TopicDetailPage id={id} />;
};

export const generateMetadata = async ({
  params: { id },
}: PageProps): Promise<Metadata> => {
  try {
    const res = await topicService.getTopicById(id);
    const topic = res.data;

    return {
      title: topic.topic_name,
      description: topic.description,
    };
  } catch (error) {
    return notFound();
  }
};

export default Page;
