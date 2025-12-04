import { cn } from "@/lib/utils";
import { AppProps } from "next/app";
import Layout from "./layout/Layout";

interface ApplicationProps {
  className?: string;
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}

function Application({ className, Component, pageProps }: ApplicationProps) {
  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden bg-(--color-bg) text-(--color-fg) transition-colors duration-500",
        className
      )}
    >
      <Layout className="relative z-10">
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default Application;
