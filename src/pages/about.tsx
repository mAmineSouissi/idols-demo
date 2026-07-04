import Head from "next/head";
import { AboutPage } from "@/components/pages/AboutPage";

const TITLE = "About — Icons";
const DESC = "Icons is not an agency. We built a platform that puts talent first — 0% commission, 48-hour payouts, and campaigns that actually convert.";

export default function About() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/about" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <AboutPage />
    </>
  );
}
