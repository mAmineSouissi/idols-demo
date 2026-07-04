import Head from "next/head";
import type { ReactNode } from "react";
import { WaitlistPage } from "@/components/pages/WaitlistPage";

function Waitlist() {
  return (
    <>
      <Head>
        <title>Join the Waitlist — Icons</title>
        <meta
          name="description"
          content="Be the first on Icons — talent gets paid in 48 hours, brands get authentic content in 48 hours, with zero commission in between."
        />
        <meta property="og:title" content="Icons — Join the Waitlist" />
        <meta property="og:description" content="Where brands meet talent. Be the first." />
        {/* Don't index the waitlist while the platform is also live;
            remove this if/when you want the route discoverable in search. */}
        <meta name="robots" content="noindex" />
      </Head>
      <WaitlistPage />
    </>
  );
}

// Waitlist owns its own chrome — skip Header/Footer.
Waitlist.getLayout = (page: ReactNode) => page;

export default Waitlist;
