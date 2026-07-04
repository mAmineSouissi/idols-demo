import Head from "next/head";
import { PricingPage } from "@/components/pages/PricingPage";

const TITLE = "Pricing — Icons";
const DESC = "Transparent pricing for brands. Start free, scale with your campaigns. 0% commission on talent payouts — always.";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/pricing" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <PricingPage />
    </>
  );
}
