"use client";

import Breadcrumb from "@/components/custom/breadcrumb";
import ProtectedRoute from "@/components/layout/protected-route";
import Container from "@/components/templates/container";
import Heading from "@/components/templates/heading";
import Loading from "@/components/templates/loading";
import { getUpdateTopicsBreadcrumb } from "@/lib/breadcrumb/course";
import { notFound } from "next/navigation";
import { useGetTopicByIdQuery } from "@/hooks/services/topics";
import UpdateTopicForm from "@/components/forms/topics/update-topic-form";

const UpdateTopicPage = ({ id }: { id: string }) => {
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
    <ProtectedRoute admin>
      <Container>
        <Breadcrumb items={getUpdateTopicsBreadcrumb(topic)} />
        <Heading title={topic.topic_name} description={topic.description} />
        <UpdateTopicForm topic={topic} />
      </Container>
    </ProtectedRoute>
  );
};

export default UpdateTopicPage;
