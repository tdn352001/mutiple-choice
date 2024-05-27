"use client";
import Container from "@/components/templates/container";
import Loading from "@/components/templates/loading";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/custom/breadcrumb";
import Heading from "@/components/templates/heading";
import { getExamsBreadcrumb } from "@/lib/breadcrumb/course";
import { Suspense } from "react";
import SearchTopic from "@/components/pages/dashboard/course/course-detail/search-topics";
import { useUserStore } from "@/store/user";
import { CustomLink } from "@/components/custom/link";
import { dynamicRouters } from "@/lib/constants/routers";
import { useGetTopicByIdQuery } from "@/hooks/services/topics";
import ExamsTable from "@/components/pages/dashboard/topics/topic-detail/exams-table";

const TopicDetailPage = ({ id }: { id: string }) => {
  const isAdmin = useUserStore((state) => state.user?.is_admin);
  const { data, isPending } = useGetTopicByIdQuery(id);
  const topic = data?.data;

  if (isPending) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (!topic) {
    return notFound();
  }

  return (
    <Container>
      <Breadcrumb items={getExamsBreadcrumb(topic)} />
      <Heading
        title={topic.topic_name}
        description={topic.description}
        action={
          isAdmin && (
            <CustomLink href={dynamicRouters.createTopic(topic.id)} icon="Plus">
              Create Topic
            </CustomLink>
          )
        }
      />
      <div>
        <Suspense>
          <SearchTopic />
        </Suspense>
        <Suspense>
          <ExamsTable topic={topic} />
        </Suspense>
      </div>
    </Container>
  );
};

export default TopicDetailPage;
