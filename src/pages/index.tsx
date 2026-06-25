import Head from "next/head";
import { HomePage } from "@/components/home/HomePage";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Icons",
  url: "https://icons.so",
  logo: "https://icons.so/logoBlack.png",
  description: "Icons connects brands with 10,000+ vetted talent — creators, musicians, dancers, photographers and more. No agency. No commission. Campaigns live in 48 hours.",
  sameAs: ["https://twitter.com/icons"],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Icons — Where Brands Meet Talent</title>
        <meta name="description" content="Icons connects brands with 10,000+ vetted talent — creators, musicians, dancers, photographers and more. No agency. No commission. Campaigns live in 48 hours." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </Head>
      <HomePage />
    </>
  );
}
