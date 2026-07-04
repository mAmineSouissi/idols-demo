import type { NextPage } from "next";
import Head from "next/head";
import { CreatorApplyPage } from "@/components/pages/CreatorApplyPage";

const TITLE = "Apply as Talent — Icons";
const DESC = "Join the Icons talent platform — creators, musicians, dancers, photographers welcome. Apply in minutes, get matched to paid brand campaigns within 48 hours.";

const Apply: NextPage = () => (
  <>
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content="https://icons.so/talents/apply" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
    </Head>
    <CreatorApplyPage />
  </>
);

export default Apply;
