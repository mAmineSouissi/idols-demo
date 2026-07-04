import Head from "next/head";
import { BlogPage } from "@/components/pages/BlogPage";

const TITLE = "Journal — Icons";
const DESC = "Insights on talent commerce, campaign strategy, and the future of brand partnerships. Written by the Icons team.";

export default function Blog() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/blog" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <BlogPage />
    </>
  );
}
