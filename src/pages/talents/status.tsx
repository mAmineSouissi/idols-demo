import Head from "next/head";
import CreatorStatusPage from "@/components/pages/CreatorStatusPage";
import type { ReactNode } from "react";

export default function CreatorStatus() {
  return (
    <>
      <Head>
        <title>Application Received — Icons</title>
        <meta name="description" content="Your creator application is in. Our team reviews within 48 hours — no bots, no auto-rejects." />
        <meta name="robots" content="noindex" />
      </Head>
      <CreatorStatusPage />
    </>
  );
}

CreatorStatus.getLayout = (page: ReactNode) => page;
