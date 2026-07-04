import Head from "next/head";
import { BrandsPage } from "@/components/pages/BrandsPage";

const TITLE = "For Brands — Icons";
const DESC = "Run talent-led campaigns that actually convert. Hand-picked creators, musicians, dancers and photographers — transparent rates, results in days, not months.";

export default function Brands() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/brands" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <BrandsPage />
    </>
  );
}
