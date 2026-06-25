import Head from "next/head";
import { ContactPage } from "@/components/pages/ContactPage";

const TITLE = "Contact — Icons";
const DESC = "Get in touch with the Icons team. Questions about campaigns, talent applications, press, or partnerships — we read every message.";

export default function Contact() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://icons.so/contact" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
      </Head>
      <ContactPage />
    </>
  );
}
