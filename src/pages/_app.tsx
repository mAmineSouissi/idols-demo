import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Application from "@/components/Application";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="idols - UGC Creator Platform - Connect with brands and create amazing content"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>idols - UGC Creator Platform</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={false}
      >
        <SmoothScroll>
          <Application Component={Component} pageProps={pageProps} />
        </SmoothScroll>
      </ThemeProvider>
    </>
  );
}
