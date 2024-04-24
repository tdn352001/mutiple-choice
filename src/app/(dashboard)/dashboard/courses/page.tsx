"use client";

import Breadcrumb from "@/components/custom/breadcrumb";
import { CustomLink } from "@/components/custom/link";
import Container from "@/components/pages/dashboard/container";
import Heading from "@/components/pages/heading";
import { courseBreadcrumb } from "@/lib/breadcrumb/course";
import { routers } from "@/lib/constants/routers";
import { getDocumentTitle } from "@/lib/get-document-title";
import { Metadata } from "next";
import React from "react";
import { useUserStore } from "@/store/user";

const Page = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin);
  return (
    <Container>
      <Breadcrumb items={courseBreadcrumb} />
      <Heading
        title="Các khóa học"
        description="Quản lý các khoá học."
        action={
          isAdmin && (
            <CustomLink href={routers.createCourse} icon="Plus">
              Thêm khóa học
            </CustomLink>
          )
        }
      />
    </Container>
  );
};

// export const metadata: Metadata = {
//   title: getDocumentTitle({ pathname: routers.courses }),
// };

export default Page;
