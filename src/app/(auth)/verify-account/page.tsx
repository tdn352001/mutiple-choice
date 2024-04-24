import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { routers } from "@/lib/constants/routers";
import { getDocumentTitle } from "@/lib/get-document-title";
import UseVerifyAccountForm from "@/components/forms/auth/verify-account-form";
import { redirect } from "next/navigation";

const Page = (props: {
  searchParams: { email?: string | string[]; isAuth?: boolean };
}) => {
  const searchParams = props.searchParams;
  const email = Array.isArray(searchParams.email)
    ? searchParams.email[0]
    : searchParams.email;

  const isAuth = searchParams.isAuth;
  if (!email) {
    return redirect(routers.login);
  }

  return (
    <div className="container flex min-h-dvh min-w-full py-4 flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icon name="Command" className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Check your email for the verification code
          </p>
        </div>
        <UseVerifyAccountForm email={email} isAuth={isAuth} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href={routers.login}
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.verifyAccount }),
  description: "Xác thực tài khoản",
};

export default Page;
