import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";

const PAGE_STYLES = `
  .nf-root {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    background: var(--color-bg);
    color: var(--color-fg);
  }
  .nf-watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-display);
    font-style: italic;
    line-height: 1;
    font-size: clamp(16rem, 38vw, 36rem);
    color: color-mix(in srgb, var(--color-fg) 5%, transparent);
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
  }
  .nf-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
    max-width: 38rem;
  }
  .nf-eyebrow {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-fg) 40%, transparent);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .nf-headline {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.95;
    color: var(--color-fg);
  }
  .nf-sub {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.75;
    letter-spacing: 0.01em;
    color: color-mix(in srgb, var(--color-fg) 55%, transparent);
    max-width: 26rem;
  }
  .nf-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.875rem;
    margin-top: 0.5rem;
  }
  .nf-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border);
  }
  .nf-footer {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-fg) 28%, transparent);
    white-space: nowrap;
  }
`;

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>404 — Page Not Found · Icons</title>
      <meta name="robots" content="noindex" />
    </Head>
    <style>{PAGE_STYLES}</style>

    <div className="nf-root dot-grid">
      {/* Giant watermark */}
      <span aria-hidden className="nf-watermark">404</span>

      {/* Sparkle accents */}
      <Sparkle
        size={48}
        fill="var(--color-accent)"
        className="absolute top-16 right-16 -rotate-12 opacity-60 pointer-events-none"
      />
      <Sparkle
        size={28}
        fill="var(--color-accent)"
        className="absolute bottom-24 left-12 rotate-6 opacity-40 pointer-events-none"
      />

      {/* Content */}
      <div className="nf-content">
        <p className="nf-eyebrow">
          <span className="w-1 h-1 rounded-full bg-current inline-block" />
          Error 404
        </p>

        <h1 className="nf-headline">
          Lost in<br />the feed.
        </h1>

        <p className="nf-sub">
          This page doesn&apos;t exist — but 10K+ creators and 500+ brand
          campaigns do. Head somewhere useful.
        </p>

        <div className="nf-actions">
          <Link href="/" className="btn-primary group">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link href="/talents" className="btn-ghost group">
            Browse creators
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link href="/brands" className="btn-ghost group">
            For brands
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Footer hint */}
      <p className="nf-footer">icons.studio</p>
    </div>
  </>
);

export default NotFound;
