import ForgotPasswordPage from "@/components/pages/auth/forgot-password";
import { DOCUMENT_TITLES, DOCUMENTS_DESCRIPTIONS } from "@/lib/constants/seo";
import { Metadata } from "next";

const Page = () => {
  return <ForgotPasswordPage />;
};

export const metadata: Metadata = {
  title: DOCUMENT_TITLES.AUTH.FORGOT_PASSWORD,
  description: DOCUMENTS_DESCRIPTIONS.AUTH.FORGOT_PASSWORD,
};

export default Page;
