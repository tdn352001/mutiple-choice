"use client";

import Breadcrumb from "@/components/custom/breadcrumb";
import MemberExamHistory from "@/components/pages/dashboard/members/profile/member-exam-history";
import Container from "@/components/templates/container";
import Heading from "@/components/templates/heading";
import LoadingPage from "@/components/templates/loading-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMemberExamHistoryQuery } from "@/hooks/services/members";
import { memberBreadcrumb } from "@/lib/breadcrumb/course";
import { routers } from "@/lib/constants/routers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface MemberProfileProps {
  memberId: string | number;
}

const MemberProfile = ({ memberId }: MemberProfileProps) => {
  const { data, isPending, isError } = useGetMemberExamHistoryQuery({
    memberId,
  });

  const router = useRouter();

  useEffect(() => {
    const user = data?.user;
    if (user) {
      const currentTitle = window.document.title;
      window.document.title = `${user.full_name} Profile`;

      return () => {
        window.document.title = currentTitle;
      };
    }
  }, [data?.user]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to get member data");
      router.replace(routers.courses);
    }
  }, [isError, router]);

  if (isPending || !data) {
    return <LoadingPage />;
  }

  const { user } = data;

  return (
    <ScrollArea className="size-full">
      <Container>
        <Breadcrumb
          items={[
            ...memberBreadcrumb,
            {
              title: user.full_name,
              href: "#",
            },
          ]}
        />
        <Heading title={`${user.full_name} Profile`} />
        <div className=" space-y-8">
          <div>
            <p className="text-lg ">
              <span className="font-medium">Name: </span>
              <span>{user.full_name}</span>
            </p>
            <p className="text-lg ">
              <span className="font-medium">Email: </span>
              <span>{user.email}</span>
            </p>
          </div>
          <MemberExamHistory memberId={user.id} />
        </div>
      </Container>
    </ScrollArea>
  );
};

export default MemberProfile;
