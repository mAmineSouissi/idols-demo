import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Archivo_Black,
  Bricolage_Grotesque,
  Caveat,
  DM_Mono,
  Inter,
} from "next/font/google";
import Application from "@/components/Application";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { PageTransition } from "@/components/shared/PageTransition";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonical = `https://icons.so${router.asPath.split("?")[0].split("#")[0]}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --font-sans: ${inter.style.fontFamily}, ui-sans-serif, system-ui, sans-serif;
          --font-display: ${archivoBlack.style.fontFamily}, "Archivo Black", ui-sans-serif, system-ui, sans-serif;
          --font-grotesque: ${bricolage.style.fontFamily}, ui-sans-serif, system-ui, sans-serif;
          --font-bricolage: ${bricolage.style.fontFamily}, "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
          --font-script: ${caveat.style.fontFamily}, "Caveat", cursive;
          --font-mono: ${dmMono.style.fontFamily}, "DM Mono", ui-monospace, monospace;
          --font-serif: ${archivoBlack.style.fontFamily}, "Archivo Black", ui-sans-serif, sans-serif;
        }
        html, body { font-family: var(--font-sans); }
      ` }} />
      <div
        className={`${archivoBlack.variable} ${inter.variable} ${caveat.variable} ${dmMono.variable} ${bricolage.variable}`}
      >
        <Head>
          <meta name="description" content="Icons connects brands with 10,000+ vetted talent — creators, musicians, dancers, photographers and more. No agency. No commission. Campaigns live in 48 hours." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonical} />
          <title>Icons — Where Brands Meet Talent</title>
          <link rel="icon" href="/favicon.ico" />
          {/* Open Graph — page-level Head blocks override these per-route */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Icons" />
          <meta property="og:title" content="Icons — Where Brands Meet Talent" />
          <meta property="og:description" content="Icons connects brands with 10,000+ vetted talent — creators, musicians, dancers, photographers and more. No agency. No commission. Campaigns live in 48 hours." />
          <meta property="og:image" content="https://icons.so/logoBlack.png" />
          <meta property="og:image:alt" content="Icons — Where Brands Meet Talent" />
          {/* Twitter / X card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@icons" />
          <meta name="twitter:title" content="Icons — Where Brands Meet Talent" />
          <meta name="twitter:description" content="Icons connects brands with 10,000+ vetted talent — creators, musicians, dancers, photographers and more. No agency. No commission. Campaigns live in 48 hours." />
          <meta name="twitter:image" content="https://icons.so/logoBlack.png" />
        </Head>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
        >
          <ErrorBoundary>
            <SmoothScroll>
              <PageTransition>
                <Application Component={Component} pageProps={pageProps} />
              </PageTransition>
            </SmoothScroll>
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    </>
  );
}
