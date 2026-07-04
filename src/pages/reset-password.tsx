import Head from "next/head";
import ResetPasswordPage from "@/components/pages/ResetPasswordPage";
import type { ReactNode } from "react";

function ResetPassword() {
  return (
    <>
      <Head>
        <title>Set a New Password — Icons</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ResetPasswordPage />
    </>
  );
}

ResetPassword.getLayout = (page: ReactNode) => page;

export default ResetPassword;
