import Head from "next/head";
import { CreatorsPage } from "@/components/pages/CreatorsPage";

const TITLE = "Talent — Icons";
const DESC = "Browse 10,000+ vetted talent — creators, musicians, dancers, photographers — across every niche. Filter by category, tier, and platform to find the right fit for your brand.";

export default function Creators() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/talents" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <CreatorsPage />
    </>
  );
}
