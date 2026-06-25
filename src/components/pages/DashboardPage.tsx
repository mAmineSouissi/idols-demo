"use client";

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight, LayoutDashboard, FileText, Users, DollarSign,
  Settings, LogOut, Bell, ChevronRight, BarChart2, Menu, X,
  CheckCircle2, Clock, Zap, Upload, Check, TrendingUp, Send,
  ExternalLink, CreditCard, Mail, Smartphone, Globe, Star, UserCheck,
  MessageSquare, Paperclip, ArrowLeft,
} from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur, stagger } from "@/lib/motion";
import {
  MonoLabel,
  Avatar,
  Chip,
  FileChip,
  IconButton,
  StickerCard,
  EmptyState,
  InlineToast,
} from "@/components/shared/primitives";
import { useAuthStore } from "@/stores/auth.store";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useCurrentUser, type CurrentUserView } from "@/hooks/useCurrentUser";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ────────────────────────────────────────────────────────────── */
/* STYLES                                                         */
/* ────────────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  /* Root layout — viewport-locked so sidebar never scrolls */
  .db-root {
    display: grid;
    grid-template-columns: 1fr;
    height: 100svh;
    overflow: hidden;
    background: var(--color-bg);
    color: var(--color-fg);
  }
  @media (min-width: 1024px) {
    .db-root { grid-template-columns: 272px 1fr; }
    .db-root[data-collapsed="true"] { grid-template-columns: 64px 1fr; }
  }

  /* Desktop sidebar */
  .db-sidebar {
    display: none;
    flex-direction: column;
    border-right: 2px solid var(--color-fg);
    height: 100svh;
    overflow-y: auto;
    overflow-x: hidden;
    background: var(--color-bg);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @media (min-width: 1024px) {
    .db-sidebar { display: flex; width: 272px; }
    .db-root[data-collapsed="true"] .db-sidebar { width: 64px; }
  }

  /* Collapsed sidebar overrides */
  .db-root[data-collapsed="true"] .db-sidebar-label { display: none; }
  .db-root[data-collapsed="true"] .db-nav-item {
    justify-content: center; padding: 0.7rem; gap: 0;
  }
  .db-root[data-collapsed="true"] .db-nav-item .db-nav-icon { margin: 0; opacity: 0.8; }
  .db-root[data-collapsed="true"] .db-sidebar-logo { justify-content: center; padding: 0.75rem; overflow: hidden; }
  .db-root[data-collapsed="true"] .db-sidebar-logo .db-logo-full { display: none; }
  .db-root[data-collapsed="true"] .db-sidebar-logo .db-logo-mark { display: block; }
  .db-root[data-collapsed="true"] .db-sidebar-user { justify-content: center; padding: 0.75rem; }
  .db-root[data-collapsed="true"] .db-sidebar-user .db-user-details { display: none; }
  .db-root[data-collapsed="true"] .db-sidebar-user .sticker { padding: 0; background: transparent; border: none; box-shadow: none; }
  .db-root[data-collapsed="true"] .db-sidebar-nav { padding: 0.75rem 0.5rem; }
  .db-root[data-collapsed="true"] .db-sidebar-signout { padding: 0.75rem 0.5rem; }

  /* Scrollable main column */
  .db-main {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100svh;
    display: flex;
    flex-direction: column;
  }

  /* Unified sidebar button: hamburger on mobile, chevron on desktop */
  .db-sidebar-btn-chevron { display: none; }
  @media (min-width: 1024px) {
    .db-sidebar-btn-menu { display: none; }
    .db-sidebar-btn-chevron { display: block; }
  }

  /* Mobile overlay */
  .db-sidebar-mobile {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
  }

  /* Stats strip grid */
  .db-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    .db-stats-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .db-stat-cell {
    padding: 2.25rem 2rem;
    border-right: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  @media (min-width: 768px) {
    .db-stat-cell { padding: 2.75rem 2.75rem; border-bottom: none; }
  }
  .db-stat-cell:nth-child(even) { border-right: none; }
  @media (min-width: 768px) {
    .db-stat-cell:nth-child(even) { border-right: 1px solid rgba(255,255,255,0.1); }
    .db-stat-cell:last-child { border-right: none; }
  }

  /* Campaign cards grid */
  .db-cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  @media (min-width: 640px) {
    .db-cards-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* Sidebar nav item */
  .db-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-fg) 65%, transparent);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }
  .db-nav-item:hover { background: var(--color-panel); color: var(--color-fg); }
  .db-nav-item[data-active="true"] { background: var(--color-fg); color: var(--color-bg); }

  /* Action rows */
  .db-action-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    position: relative;
  }
  .db-action-row:last-child { border-bottom: none; }
  .db-action-row:hover { background: var(--color-fg); }
  .db-action-row:hover .db-action-label  { color: var(--color-bg); }
  .db-action-row:hover .db-action-icon   { color: var(--color-accent); }
  .db-action-row:hover .db-action-arrow  { opacity: 1; color: var(--color-accent); }

  /* Activity rows */
  .db-activity-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--color-border);
  }
  .db-activity-row:last-child { border-bottom: none; }

  /* Bottom row: activity + actions side-by-side */
  .db-bottom-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 1024px) {
    .db-bottom-grid { grid-template-columns: 1fr 340px; }
  }

  /* Pulsing live dot */
  @keyframes db-pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(1.35); }
  }
  .db-live-dot { animation: db-pulse 2s ease-in-out infinite; }

  /* Active status ring */
  @keyframes db-ring {
    0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent) 60%, transparent); }
    70%  { box-shadow: 0 0 0 6px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  .db-ring { animation: db-ring 2.4s ease-out infinite; }

  /* ── Tab sections ── */
  .db-tab-section { padding: 3rem 1.5rem 5rem; max-width: 72rem; margin: 0 auto; width: 100%; }
  @media (min-width: 768px) { .db-tab-section { padding: 3rem 2.5rem 6rem; } }

  .db-campaign-list { display: flex; flex-direction: column; gap: 1px; border: 2px solid var(--color-fg); border-radius: 16px; overflow: hidden; box-shadow: 5px 5px 0 0 var(--color-fg); }
  .db-campaign-row {
    display: grid; grid-template-columns: 1fr auto;
    align-items: center; gap: 1rem; padding: 1.25rem 1.5rem;
    background: var(--color-bg); border-bottom: 1px solid var(--color-border);
    transition: background 0.15s;
  }
  .db-campaign-row:last-child { border-bottom: none; }
  .db-campaign-row:hover { background: var(--color-panel); }

  .db-status-chip {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.3rem 0.75rem; border-radius: 999px; border: 1.5px solid; white-space: nowrap;
  }

  .db-upload-panel {
    border: 2px solid var(--color-fg); border-radius: 16px; padding: 1.5rem;
    background: var(--color-panel); box-shadow: 4px 4px 0 0 var(--color-accent);
    display: flex; flex-direction: column; gap: 1.25rem;
  }
  .db-content-input {
    width: 100%; background: var(--color-bg); border: 2px solid var(--color-border);
    border-radius: 10px; padding: 0.75rem 1rem; font-family: var(--font-mono);
    font-size: 12px; color: var(--color-fg); transition: border-color 0.15s;
  }
  .db-content-input:focus { outline: none; border-color: var(--color-fg); }

  .db-payout-row {
    display: grid; grid-template-columns: 1fr auto auto;
    align-items: center; gap: 1rem; padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-mono);
  }
  .db-payout-row:last-child { border-bottom: none; }

  .db-review-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 640px) { .db-review-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .db-review-grid { grid-template-columns: repeat(3, 1fr); } }

  .db-review-card {
    border: 2px solid var(--color-fg); border-radius: 14px; padding: 1.25rem;
    background: var(--color-bg); box-shadow: 3px 3px 0 0 var(--color-fg);
    display: flex; flex-direction: column; gap: 1rem;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .db-review-card:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 0 var(--color-fg); }

  /* ── Notification flyout ── */
  .db-bell-flyout {
    position: absolute; top: calc(100% + 0.5rem); right: 0; z-index: 50;
    width: 22rem; max-width: calc(100vw - 2rem);
    background: var(--color-bg); border: 2px solid var(--color-fg);
    border-radius: 16px; box-shadow: 6px 6px 0 0 var(--color-fg);
    overflow: hidden;
  }
  .db-notif-row {
    display: flex; align-items: flex-start; gap: 0.875rem;
    padding: 0.875rem 1rem; border-bottom: 1px solid var(--color-border);
    transition: background 0.12s; cursor: default;
  }
  .db-notif-row:last-child { border-bottom: none; }
  .db-notif-row:hover { background: var(--color-panel); }
  .db-notif-icon {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid var(--color-fg);
  }
  .db-notif-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent);
    flex-shrink: 0; margin-top: 5px;
  }

  /* ── Profile panel ── */
  .db-profile-hero {
    border-bottom: 2px solid var(--color-fg); padding: 2.5rem;
    display: flex; align-items: center; gap: 1.5rem;
  }
  .db-profile-avatar {
    width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0;
    border: 2.5px solid var(--color-fg); background: var(--color-accent);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-style: italic; font-size: 2rem;
  }
  .db-profile-field {
    display: grid; grid-template-columns: 140px 1fr; align-items: start;
    gap: 0.75rem 1.25rem; padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
  }
  .db-profile-field:last-child { border-bottom: none; }
  .db-settings-toggle {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 0; border-bottom: 1px solid var(--color-border);
  }
  .db-settings-toggle:last-child { border-bottom: none; }
  .db-toggle-switch {
    position: relative; width: 36px; height: 20px;
    border-radius: 999px; border: 2px solid var(--color-fg);
    cursor: pointer; transition: background 0.2s;
    flex-shrink: 0;
  }
  .db-toggle-switch::after {
    content: ''; position: absolute; top: 2px; left: 2px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--color-fg); transition: transform 0.2s;
  }
  .db-toggle-switch[data-on="true"] { background: var(--color-accent); }
  .db-toggle-switch[data-on="true"]::after { transform: translateX(16px); background: #000; }

  /* ── Shortlist grid ── */
  .db-shortlist-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 640px)  { .db-shortlist-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .db-shortlist-grid { grid-template-columns: repeat(3, 1fr); } }
  .db-shortlist-card {
    border: 2px solid var(--color-fg); border-radius: 14px; overflow: hidden;
    box-shadow: 3px 3px 0 0 var(--color-fg); transition: transform 0.15s, box-shadow 0.15s;
  }
  .db-shortlist-card:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 0 var(--color-fg); }

  /* ── Messages / Chat ── */
  .db-chat-layout {
    display: flex; flex-direction: column; flex: 1; min-height: 0;
  }
  @media (min-width: 768px) {
    .db-chat-layout { flex-direction: row; }
  }

  .db-chat-threads {
    border-bottom: 2px solid var(--color-fg);
    overflow-y: auto; flex-shrink: 0;
  }
  @media (min-width: 768px) {
    .db-chat-threads {
      width: 340px; min-width: 280px; border-bottom: none;
      border-right: 2px solid var(--color-fg); height: 100%;
    }
  }
  .db-chat-thread {
    display: flex; align-items: center; gap: 0.875rem;
    padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border);
    cursor: pointer; transition: background 0.12s;
    border: none; background: none; width: 100%; text-align: left;
    color: inherit; font: inherit;
  }
  .db-chat-thread:hover { background: var(--color-panel); }
  .db-chat-thread:focus-visible {
    outline: 2px solid var(--color-accent); outline-offset: -2px;
  }
  .db-chat-thread[data-active="true"] { background: var(--color-panel); }

  .db-chat-avatar {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--color-fg); display: flex; align-items: center;
    justify-content: center; font-family: var(--font-display);
    font-style: italic; font-size: 1rem; font-weight: 700;
    background: var(--color-accent);
  }

  .db-chat-view {
    flex: 1; display: flex; flex-direction: column;
    min-height: 0; position: relative;
  }

  .db-chat-header {
    padding: 0.75rem 1.25rem; border-bottom: 2px solid var(--color-fg);
    display: flex; align-items: center; gap: 1rem; flex-shrink: 0;
    background: var(--color-bg);
  }
  .db-chat-back { display: inline-flex; }
  @media (min-width: 768px) { .db-chat-back { display: none; } }

  /* Milestone strip */
  .db-chat-milestones {
    display: flex; align-items: center; gap: 0; padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--color-border); overflow-x: auto;
    flex-shrink: 0; background: var(--color-bg);
  }
  .db-chat-ms-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--color-fg); position: relative; z-index: 1;
  }
  .db-chat-ms-dot[data-done="true"] { background: var(--color-accent); border-color: var(--color-accent); }
  .db-chat-ms-dot[data-active="true"] { background: var(--color-fg); animation: db-pulse 2s ease-in-out infinite; }
  .db-chat-ms-line {
    width: 24px; height: 2px; background: var(--color-border); flex-shrink: 0;
  }
  .db-chat-ms-line[data-done="true"] { background: var(--color-accent); }
  .db-chat-ms-label {
    font-family: var(--font-mono); font-size: 9px; text-transform: uppercase;
    letter-spacing: 0.15em; opacity: 0.5; white-space: nowrap; margin-left: 0.75rem;
  }
  .db-chat-ms-dot[data-active="true"] + .db-chat-ms-label { opacity: 1; font-weight: 600; }

  .db-chat-messages {
    flex: 1; overflow-y: auto; padding: 1.25rem; display: flex;
    flex-direction: column; gap: 0.5rem;
  }

  .db-chat-bubble {
    max-width: 75%; padding: 0.65rem 0.9rem; font-size: 13px;
    line-height: 1.55; border: 1.5px solid var(--color-fg);
    position: relative; word-break: break-word;
  }
  .db-chat-bubble[data-self="true"] {
    background: var(--color-fg); color: var(--color-bg);
    border-radius: var(--radius-md) var(--radius-md) 4px var(--radius-md); align-self: flex-end;
  }
  .db-chat-bubble[data-self="false"] {
    background: var(--color-bg);
    border-radius: var(--radius-md) var(--radius-md) var(--radius-md) 4px; align-self: flex-start;
  }

  .db-chat-system {
    display: flex; align-items: center; gap: 0.5rem;
    justify-content: center; padding: 0.65rem 1rem; margin: 0.5rem 0;
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase;
    opacity: 0.55;
  }

  .db-chat-milestone-card {
    border: 2px solid var(--color-fg); border-radius: var(--radius-md);
    padding: 1rem 1.25rem; background: var(--color-panel);
    box-shadow: 3px 3px 0 0 var(--color-accent);
    margin: 0.5rem 0; align-self: stretch;
  }

  .db-chat-file-chip {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.35rem 0.65rem; border-radius: var(--radius-sm);
    background: var(--color-panel); border: 1.5px solid var(--color-border);
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.08em; transition: border-color 0.15s;
    margin-top: 0.4rem;
  }
  .db-chat-file-chip:hover { border-color: var(--color-fg); }

  .db-chat-composer {
    display: flex; align-items: flex-end; gap: 0.5rem;
    padding: 0.75rem 1.25rem; border-top: 2px solid var(--color-fg);
    background: var(--color-bg); flex-shrink: 0;
  }
  .db-chat-input {
    flex: 1; resize: none; border: 2px solid var(--color-border);
    border-radius: 10px; padding: 0.6rem 0.85rem;
    font-family: var(--font-mono); font-size: 12px;
    background: var(--color-bg); color: var(--color-fg);
    max-height: 100px; min-height: 38px; line-height: 1.5;
  }
  .db-chat-input:focus { outline: none; border-color: var(--color-fg); }
  .db-chat-input::placeholder { opacity: 0.4; }

  .db-chat-send {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--color-fg); display: flex;
    align-items: center; justify-content: center;
    background: var(--color-fg); color: var(--color-bg);
    cursor: pointer; transition: opacity 0.12s;
  }
  .db-chat-send:hover { opacity: 0.85; }

  .db-chat-badge {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 18px; height: 18px; border-radius: 999px;
    background: var(--color-accent); color: var(--color-fg);
    font-family: var(--font-mono); font-size: 9px;
    font-weight: 700; padding: 0 5px;
  }

  .db-chat-empty {
    flex: 1; display: none; flex-direction: column;
    align-items: center; justify-content: center; gap: 1rem;
    padding: 3rem; opacity: 0.5;
  }
  @media (min-width: 768px) {
    .db-chat-empty { display: flex; }
  }

  /* Toast feedback handled by <InlineToast> primitive */

  /* Mobile: when a thread is open, hide list and show chat full-screen */
  @media (max-width: 767px) {
    .db-chat-layout[data-thread-open="true"] .db-chat-threads { display: none; }
    .db-chat-layout[data-thread-open="true"] .db-chat-view { height: 100%; }
    .db-chat-layout[data-thread-open="false"] .db-chat-view { display: none; }
    .db-chat-layout[data-thread-open="false"] .db-chat-empty { display: none; }
    .db-chat-bubble { max-width: 85%; }
  }
`;

/* ────────────────────────────────────────────────────────────── */
/* DATA                                                           */
/* ────────────────────────────────────────────────────────────── */

const creatorData = {
  user:  { name: "Maya R.", handle: "@mayareads", avatar: "M", tier: "Verified creator" },
  focus: { label: "Payout arriving", value: "in 18 hours", cta: "View details", href: "#" },
  stats: [
    { label: "Earned this month", value: "$1,840", delta: "+12%",    up: true  },
    { label: "Active campaigns",  value: "3",       delta: "running", up: true  },
    { label: "Avg engagement",    value: "6.4%",    delta: "+0.3%",   up: true  },
    { label: "Payout in",         value: "18h",     delta: "on time", up: true  },
  ],
  featured: {
    brand: "Penguin Random House",
    brief: "New Fiction Summer 2026 — Haul + review, 60s TikTok",
    status: "active",
    due: "Due Jun 12",
    budget: "$1,200",
    tag: "Books",
    note: "Content draft due in 3 days. Upload via brief portal.",
  },
  campaigns: [
    {
      brand: "Leuchtturm1917",
      brief: "Journaling starter kit unboxing — Instagram Reel",
      status: "review",
      due: "In review",
      budget: "$640",
      tag: "Stationery",
      note: "Icons team reviewing your draft. Approval expected within 48h.",
    },
    {
      brand: "Chamberlain Coffee",
      brief: "Morning ritual collab — 45s TikTok, soft integration",
      status: "pending",
      due: "Starts Jun 18",
      budget: "$900",
      tag: "Food & Drink",
      note: "Brief goes live Jun 18. Check your email for the full brief PDF.",
    },
  ],
  activity: [
    { group: "Today",
      items: [
        { icon: "paid",  text: "Payout of $640 from Leuchtturm1917 sent" },
        { icon: "brief", text: "New brief from Chamberlain Coffee matched to you" },
      ],
    },
    { group: "Yesterday",
      items: [
        { icon: "check", text: "Penguin Random House approved your content draft" },
      ],
    },
    { group: "Earlier",
      items: [
        { icon: "brief", text: "Skillshare brief declined — niche mismatch flagged" },
      ],
    },
  ],
};

const brandData = {
  user:  { name: "GlowBeauty Co.", handle: "Brand account", avatar: "G", tier: "Pro plan" },
  focus: { label: "3 creators accepted", value: "Summer Glow brief", cta: "Review matches", href: "#" },
  stats: [
    { label: "Active campaigns", value: "4",     delta: "+2 this week", up: true  },
    { label: "Budget spent",     value: "$8.4K", delta: "of $15K",      up: true  },
    { label: "Creator matches",  value: "12",    delta: "awaiting you",  up: false },
    { label: "Avg ROAS",         value: "3.2×",  delta: "+0.4× vs last", up: true  },
  ],
  featured: {
    brand: "Summer Glow Collection",
    brief: "GRWM-style TikToks featuring the new SPF moisturiser — 4 creators, 60s format",
    status: "active",
    due: "Live Jun 8",
    budget: "$3,200",
    tag: "Beauty",
    note: "3 of 4 creators confirmed. One slot still open — review matches now.",
  },
  campaigns: [
    {
      brand: "Fragrance Launch",
      brief: "Lifestyle reels — morning routine integration",
      status: "review",
      due: "Reviewing creators",
      budget: "$2,800",
      tag: "Fragrance",
      note: "Icons matched 6 creators. Review and confirm your top 3 picks.",
    },
    {
      brand: "Winter Skincare",
      brief: "Before/after skincare routines, 4 creators",
      status: "pending",
      due: "Draft stage",
      budget: "$4,400",
      tag: "Skincare",
      note: "Brief in draft. Complete it to start the matching process.",
    },
  ],
  activity: [
    { group: "Today",
      items: [
        { icon: "check", text: "3 creators accepted your Summer Glow brief" },
        { icon: "brief", text: "Icons matched 4 new creators to Fragrance Launch" },
      ],
    },
    { group: "Yesterday",
      items: [
        { icon: "paid", text: "Payment of $3,200 processed for Summer Glow" },
      ],
    },
    { group: "Earlier",
      items: [
        { icon: "check", text: "Campaign report ready — Vitamin C Serum drop" },
      ],
    },
  ],
};

/* ────────────────────────────────────────────────────────────── */
/* HELPERS                                                        */
/* ────────────────────────────────────────────────────────────── */

const statusTone: Record<string, string> = {
  active: "accent", review: "yellow", pending: "cream",
};
const statusLabel: Record<string, string> = {
  active: "Active", review: "In review", pending: "Upcoming",
};

/* ────────────────────────────────────────────────────────────── */
/* SUB-COMPONENTS                                                 */
/* ────────────────────────────────────────────────────────────── */

function CampaignCard({ brand, brief, status, due, budget, tag, note }: {
  brand: string; brief: string; status: string;
  due: string; budget: string; tag: string; note?: string;
}) {
  const tone = statusTone[status] ?? "cream";
  return (
    <article className="db-campaign-card sticker flex flex-col gap-4 p-6" data-tone={tone}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 rounded-full border-2 border-current">
          {tag}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-[10px] uppercase tracking-[0.18em]">
          {status === "active" && (
            <span className="db-live-dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-fg)" }} />
          )}
          {statusLabel[status]}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-display italic text-lg leading-tight mb-1.5">{brand}</h4>
        <p className="font-sans text-[13px] leading-relaxed opacity-75">{brief}</p>
        {note && (
          <p className="font-mono font-semibold text-[10px] uppercase tracking-[0.16em] leading-relaxed opacity-60 mt-3 pt-3 border-t border-current">
            {note}
          </p>
        )}
      </div>
      <div className="flex items-end justify-between pt-3 border-t border-current" style={{ borderColor: "currentColor" }}>
        <span className="font-mono font-semibold text-[10px] uppercase tracking-[0.2em] opacity-70">{due}</span>
        <span className="font-display italic text-xl leading-none">{budget}</span>
      </div>
    </article>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const base = "w-9 h-9 rounded-full shrink-0 flex items-center justify-center border-2";
  if (type === "paid")
    return (
      <div className={base} style={{ background: "var(--color-accent)", borderColor: "var(--color-fg)", color: "var(--color-fg)" }}>
        <DollarSign className="w-3.5 h-3.5" />
      </div>
    );
  if (type === "check")
    return (
      <div className={base} style={{ borderColor: "var(--color-fg)", background: "var(--color-panel)" }}>
        <CheckCircle2 className="w-4 h-4" />
      </div>
    );
  return (
    <div className={base} style={{ borderColor: "var(--color-border)", background: "var(--color-panel)" }}>
      <FileText className="w-3.5 h-3.5 opacity-40" />
    </div>
  );
}

/* ── Sidebar ──────────────────────────────────────────────────── */

function SidebarContent({ mode, active, onNav, onClose, onSignOut, user }: {
  mode: "creator" | "brand";
  active: string;
  onNav: (s: string) => void;
  onClose?: () => void;
  onSignOut: () => void;
  user: CurrentUserView | null;
}) {
  const creatorNav = [
    { id: "overview",  label: "Overview",  icon: LayoutDashboard },
    { id: "campaigns", label: "Campaigns", icon: FileText        },
    { id: "messages",  label: "Messages",  icon: MessageSquare   },
    { id: "earnings",  label: "Earnings",  icon: DollarSign      },
    { id: "profile",   label: "Profile",   icon: Users           },
    { id: "settings",  label: "Settings",  icon: Settings        },
  ];
  const brandNav = [
    { id: "overview",  label: "Overview",  icon: LayoutDashboard },
    { id: "campaigns", label: "Campaigns", icon: FileText        },
    { id: "messages",  label: "Messages",  icon: MessageSquare   },
    { id: "creators",  label: "Creators",  icon: Users           },
    { id: "analytics", label: "Analytics", icon: BarChart2       },
    { id: "settings",  label: "Settings",  icon: Settings        },
  ];
  const nav = mode === "creator" ? creatorNav : brandNav;

  return (
    <>
      {/* Logo */}
      <div className="db-sidebar-logo flex items-center justify-between px-6 py-5 border-b-2 border-(--color-fg)">
        <Link href="/" className="font-display italic leading-none tracking-tight">
          <span className="db-logo-full text-3xl">Icons.</span>
          <span className="db-logo-mark text-2xl" style={{ display: "none" }}>I.</span>
        </Link>
        {onClose && (
          <button onClick={onClose}
            className="db-sidebar-label inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* User card */}
      <div className="db-sidebar-user px-4 py-4 border-b-2 border-(--color-fg)">
        <div className="sticker flex items-center gap-3 p-3" data-tone="cream" style={{ boxShadow: "none" }}>
          <div className="db-ring w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-display italic text-lg border-2 border-(--color-fg) overflow-hidden"
            style={{ background: "var(--color-accent)", color: "var(--color-fg)" }}>
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.avatar ?? "…"
            )}
          </div>
          <div className="db-user-details min-w-0">
            <p className="font-display italic text-base leading-tight truncate">{user?.name ?? "Loading…"}</p>
            <p className="font-mono font-semibold text-[9px] uppercase tracking-[0.22em] opacity-65 mt-0.5">{user?.tier ?? ""}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="db-sidebar-nav flex-1 px-3 py-5 flex flex-col gap-0.5">
        <p className="db-sidebar-label font-mono font-semibold text-[9px] uppercase tracking-[0.32em] opacity-60 px-3 pb-3">Navigation</p>
        {nav.map(({ id, label, icon: Icon }) => (
          <button key={id} className="db-nav-item"
            data-active={active === id ? "true" : "false"}
            onClick={() => { onNav(id); onClose?.(); }}
            title={label}>
            <Icon className="db-nav-icon w-4 h-4 opacity-55 shrink-0" />
            <span className="db-sidebar-label">{label}</span>
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div className="db-sidebar-signout px-3 py-4 border-t-2 border-(--color-fg)">
        <button onClick={onSignOut} className="db-nav-item w-full text-left" title="Sign out">
          <LogOut className="db-nav-icon w-4 h-4 opacity-55 shrink-0" />
          <span className="db-sidebar-label">Sign out</span>
        </button>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* TAB PANELS                                                     */
/* ────────────────────────────────────────────────────────────── */

/* ── Notification data ───────────────────────────────────────── */
const CREATOR_NOTIFS = [
  { icon: "paid",  text: "$640 payout arriving in 18h",        sub: "Leuchtturm1917 · just now",    unread: true  },
  { icon: "check", text: "Content approved",                   sub: "Chamberlain Coffee · 2h ago",  unread: true  },
  { icon: "brief", text: "New match: Patagonia Summer brief",  sub: "Deadline in 4 days · 1d ago",  unread: false },
  { icon: "clock", text: "Content due in 3 days",              sub: "Penguin Random House · 2d ago", unread: false },
];
const BRAND_NOTIFS = [
  { icon: "check", text: "2 creators submitted content",       sub: "Summer Glow · just now",       unread: true  },
  { icon: "brief", text: "Campaign goes live in 2 hours",      sub: "Fragrance Launch · 1h ago",    unread: true  },
  { icon: "paid",  text: "Weekly analytics report ready",      sub: "All campaigns · 1d ago",       unread: false },
  { icon: "check", text: "New creator application: Maya R.",   sub: "Reviewed by Icons · 2d ago",   unread: false },
];

/* ── Shortlisted creators for brand panel ─────────────────── */
const SHORTLISTED = [
  { name: "Maya R.",   title: "Books & Culture",    followers: "412K", platform: "TikTok",     match: 98, handle: "mayareads",   photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { name: "Priya N.",  title: "Beauty & Wellness",  followers: "890K", platform: "Instagram",  match: 96, handle: "priyaedits",  photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80" },
  { name: "Theo W.",   title: "Fitness Coaching",   followers: "1.2M", platform: "YouTube",    match: 94, handle: "theofitness", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "Nia O.",    title: "Craft & DIY",        followers: "620K", platform: "TikTok",     match: 91, handle: "niamakes",   photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { name: "Kai L.",    title: "Travel & Food",      followers: "380K", platform: "Instagram",  match: 89, handle: "kaiwalks",   photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { name: "Sasha B.",  title: "Sustainable Living", followers: "210K", platform: "TikTok",     match: 87, handle: "sashabrews", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; border: string; dot: string }> = {
  active:  { bg: "color-mix(in srgb, var(--color-accent) 12%, transparent)", color: "var(--color-fg)", border: "var(--color-accent)", dot: "var(--color-accent)" },
  review:  { bg: "color-mix(in srgb, oklch(0.75 0.18 50) 12%, transparent)", color: "var(--color-fg)", border: "oklch(0.75 0.18 50)", dot: "oklch(0.75 0.18 50)" },
  pending: { bg: "color-mix(in srgb, var(--color-border) 40%, transparent)", color: "var(--color-muted-fg)", border: "var(--color-border)", dot: "var(--color-border)" },
};

function StatusChip({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span className="db-status-chip" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status === "review" ? "In review" : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* Creator — Campaigns */
function CreatorCampaignsPanel({ data }: { data: typeof creatorData }) {
  const [uploadFor, setUploadFor] = React.useState<string | null>(null);
  const [link, setLink] = React.useState("");
  const [submitted, setSubmitted] = React.useState<string[]>([]);
  const allCampaigns = [data.featured, ...data.campaigns];

  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ your campaigns</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          Active &amp; upcoming.
        </h2>
      </div>

      <div className="db-campaign-list mb-10">
        {allCampaigns.map((c, i) => {
          const isDone = submitted.includes(c.brand);
          return (
            <div key={i} className="db-campaign-row">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusChip status={isDone ? "review" : c.status} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50">{c.tag}</span>
                </div>
                <p className="font-display italic text-lg leading-tight mt-1">{c.brand}</p>
                <p className="font-mono text-[11px] opacity-60 leading-snug truncate">{c.brief}</p>
                <p className="font-mono text-[10px] opacity-40 mt-0.5">{isDone ? "Submitted — awaiting review" : c.note}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <p className="font-display italic text-lg">{c.budget}</p>
                <p className="font-mono text-[10px] opacity-50">{c.due}</p>
                {!isDone && c.status === "active" && (
                  <button
                    onClick={() => setUploadFor(uploadFor === c.brand ? null : c.brand)}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    Submit content
                  </button>
                )}
                {isDone && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "var(--color-accent)" }}>
                    <Check className="w-3 h-3" /> Submitted
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload panel */}
      {uploadFor && !submitted.includes(uploadFor) && (
        <div className="db-upload-panel">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 mb-1">Submitting for</p>
            <p className="font-display italic text-2xl">{uploadFor}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Content link (TikTok, Instagram, Drive, Dropbox…)</p>
            <input
              type="url"
              placeholder="https://"
              value={link}
              onChange={e => setLink(e.target.value)}
              className="db-content-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Notes for the brand (optional)</p>
            <textarea
              rows={2}
              placeholder="Any context on the content, hook choices, CTA used…"
              className="db-content-input resize-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSubmitted(s => [...s, uploadFor]); setUploadFor(null); setLink(""); }}
              className="btn-primary"
              style={{ fontSize: "11px", padding: "0.5rem 1.25rem" }}
            >
              <Send className="w-3.5 h-3.5" /> Submit for review
            </button>
            <button onClick={() => setUploadFor(null)}
              className="font-mono text-[11px] uppercase tracking-[0.15em] opacity-50 hover:opacity-80 transition-opacity">
              Cancel
            </button>
          </div>
          <p className="font-mono text-[10px] opacity-40">
            Once submitted, the Icons team reviews within 24h before forwarding to the brand.
          </p>
        </div>
      )}
    </div>
  );
}

/* Creator — Earnings */
function CreatorEarningsPanel() {
  const payouts = [
    { brand: "Leuchtturm1917",   amount: "$640",  date: "Jun 3, 2026",  status: "paid"    },
    { brand: "Penguin Random H.", amount: "$920",  date: "May 28, 2026", status: "paid"    },
    { brand: "Skillshare",       amount: "$450",  date: "May 14, 2026", status: "paid"    },
    { brand: "Chamberlain Coffee",amount: "$900",  date: "Jun 18, 2026", status: "pending" },
  ];
  const upcoming = payouts.filter(p => p.status === "pending");
  const history  = payouts.filter(p => p.status === "paid");
  const total    = history.reduce((s, p) => s + parseInt(p.amount.replace(/\D/g, "")), 0);

  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ earnings</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          Your payouts.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total earned", value: `$${total.toLocaleString()}`, sub: "all time" },
          { label: "Avg per campaign", value: `$${Math.round(total / history.length)}`, sub: "last 3 campaigns" },
          { label: "Pending", value: upcoming.length ? upcoming[0].amount : "—", sub: upcoming.length ? `arrives ${upcoming[0].date}` : "all clear" },
        ].map(s => (
          <div key={s.label} className="sticker p-6" data-tone={s.label === "Pending" && upcoming.length ? "accent" : "cream"}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 mb-2">{s.label}</p>
            <p className="font-display italic leading-none mb-1" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)" }}>{s.value}</p>
            <p className="font-mono text-[10px] opacity-50">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* How payouts work */}
      <div className="sticker p-6 md:p-8 mb-10" data-tone="ink">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 mb-4">✦ how payouts work</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Content approved", desc: "Brand confirms your content meets the brief. Usually within 48h of submission." },
            { step: "02", title: "Stripe transfer", desc: "Icons triggers a direct transfer to your Stripe account. No middleman, no agency cut." },
            { step: "03", title: "Money in 48h", desc: "Funds clear within 48 hours. You keep 100% — Icons earns from brand subscriptions." },
          ].map(s => (
            <div key={s.step} className="flex flex-col gap-2">
              <span className="font-display italic text-4xl leading-none" style={{ color: "var(--color-accent)", opacity: 0.5 }}>{s.step}</span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "var(--color-bg)" }}>{s.title}</p>
              <p className="font-sans text-[13px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-bg) 65%, transparent)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payout history */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 mb-5">Payout history</p>
        <div className="border-t-2 border-(--color-fg)">
          {payouts.map((p, i) => (
            <div key={i} className="db-payout-row">
              <div>
                <p className="font-mono text-[12px] font-semibold">{p.brand}</p>
                <p className="font-mono text-[10px] opacity-50">{p.date}</p>
              </div>
              <StatusChip status={p.status === "paid" ? "active" : "pending"} />
              <p className="font-display italic text-xl">{p.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Brand — Campaigns with content review */
function BrandCampaignsPanel({ data }: { data: typeof brandData }) {
  const [decisions, setDecisions] = React.useState<Record<string, "approved" | "revision">>({});
  const submissions = [
    { name: "Maya R.",    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", campaign: "Summer Glow Collection", match: "98", status: "submitted", link: "#" },
    { name: "Priya N.",   photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80", campaign: "Summer Glow Collection", match: "96", status: "submitted", link: "#" },
    { name: "Theo W.",    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", campaign: "Fragrance Launch",       match: "94", status: "submitted", link: "#" },
  ];
  const allCampaigns = [data.featured, ...data.campaigns];

  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ campaigns</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          All campaigns.
        </h2>
      </div>

      {/* Campaign list */}
      <div className="db-campaign-list mb-12">
        {allCampaigns.map((c, i) => (
          <div key={i} className="db-campaign-row">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <StatusChip status={c.status} />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-50">{c.tag}</span>
              </div>
              <p className="font-display italic text-lg leading-tight mt-1">{c.brand}</p>
              <p className="font-mono text-[11px] opacity-60 leading-snug">{c.brief}</p>
              <p className="font-mono text-[10px] opacity-40 mt-0.5">{c.note}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <p className="font-display italic text-xl">{c.budget}</p>
              <p className="font-mono text-[10px] opacity-50">{c.due}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content review */}
      <div className="mb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ content review</p>
        <h3 className="font-display italic leading-[0.95] mb-6" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
          Submissions awaiting approval.
        </h3>
      </div>
      <div className="db-review-grid">
        {submissions.map((s, i) => {
          const dec = decisions[s.name];
          return (
            <div key={i} className="db-review-card">
              <div className="flex items-center gap-3">
                <img src={s.photo} alt={s.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-(--color-fg)" />
                <div>
                  <p className="font-mono text-[12px] font-semibold">{s.name}</p>
                  <p className="font-mono text-[10px] opacity-50">{s.campaign}</p>
                </div>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent)", border: "1px solid var(--color-accent)" }}>
                  {s.match}% match
                </span>
              </div>

              {dec ? (
                <div className="flex items-center gap-2 font-mono text-[11px]"
                  style={{ color: dec === "approved" ? "var(--color-accent)" : "oklch(0.75 0.18 50)" }}>
                  {dec === "approved" ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {dec === "approved" ? "Content approved — payout triggered" : "Revision requested — creator notified"}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[10px] opacity-60"
                    style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                    <TrendingUp className="w-3 h-3 shrink-0" />
                    Content submitted · 60s TikTok, hook-first format
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDecisions(d => ({ ...d, [s.name]: "approved" }))}
                      className="flex-1 btn-primary"
                      style={{ fontSize: "10px", padding: "0.45rem 0.75rem", justifyContent: "center" }}>
                      <Check className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => setDecisions(d => ({ ...d, [s.name]: "revision" }))}
                      className="flex-1 btn-ghost"
                      style={{ fontSize: "10px", padding: "0.45rem 0.75rem", justifyContent: "center" }}>
                      Request revision
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Brand — Analytics */
function BrandAnalyticsPanel({ data }: { data: typeof brandData }) {
  const metrics = [
    { label: "Total reach",       value: "4.2M",  delta: "+18% vs last campaign", up: true },
    { label: "Avg engagement",    value: "6.8%",  delta: "vs 1.2% paid media",    up: true },
    { label: "Content pieces",    value: "14",    delta: "across 4 campaigns",     up: true },
    { label: "Cost per view",     value: "$0.004",delta: "vs $0.08 CPV paid",      up: true },
    { label: "Brand search lift", value: "+34%",  delta: "during campaign window", up: true },
    { label: "Avg ROAS",          value: data.stats[3].value, delta: data.stats[3].delta, up: true },
  ];

  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ analytics</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          Performance.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {metrics.map(m => (
          <div key={m.label} className="sticker p-5" data-tone="cream">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-55 mb-2">{m.label}</p>
            <p className="font-display italic leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)" }}>{m.value}</p>
            <p className="font-mono text-[10px]" style={{ color: m.up ? "var(--color-accent)" : "var(--color-muted-fg)" }}>
              ↑ {m.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="sticker p-6 md:p-8" data-tone="ink">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60 mb-3">✦ icons insight</p>
        <p className="font-display italic text-2xl md:text-3xl leading-tight mb-3">
          Talent outperforms paid<br />media on every metric.
        </p>
        <p className="font-sans text-[13px] leading-relaxed opacity-70 max-w-xl">
          Your campaigns averaged 6.8% engagement vs the 1.2% industry benchmark for paid social. At $0.004 cost-per-view, you&apos;re getting 20× the efficiency of studio-produced ads.
        </p>
      </div>
    </div>
  );
}

/* ── Creator Profile Panel ───────────────────────────────────── */
function CreatorProfilePanel({ user }: { user: CurrentUserView | null }) {
  const platforms = Object.keys(user?.socials ?? {})
    .filter((k) => k !== "website" && (user?.socials?.[k]))
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
    .join(" · ");
  const fields = [
    { label: "Display name",  value: user?.name ?? "—"                     },
    { label: "Handle",        value: user?.handle ?? "—"                   },
    { label: "Account type",  value: user?.tier ?? "—"                     },
    { label: "Niche",         value: user?.bio || "—"                      },
    { label: "Platforms",     value: platforms || "—"                      },
    { label: "Email",         value: user?.email ?? "—"                    },
    { label: "Payout method", value: "PayPal — verified"                   },
    { label: "Location",      value: "—"                                   },
  ];
  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ your profile</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          Creator identity.
        </h2>
      </div>

      {/* Profile card */}
      <div className="border-2 border-(--color-fg) rounded-2xl overflow-hidden mb-8"
        style={{ boxShadow: "5px 5px 0 0 var(--color-fg)" }}>
        {/* Hero strip */}
        <div className="db-profile-hero" style={{ background: "var(--color-panel)" }}>
          <div className="db-profile-avatar overflow-hidden" style={{ color: "var(--color-fg)" }}>
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.avatar ?? "…"
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display italic text-2xl leading-tight">{user?.name ?? "Loading…"}</p>
            <p className="font-mono text-[11px] opacity-55 mt-0.5">{user?.handle ?? ""}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-accent) 20%, transparent)", color: "var(--color-accent)", border: "1px solid var(--color-accent)" }}>
                <UserCheck className="w-3 h-3" /> Verified
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-(--color-border)">
                <Star className="w-3 h-3" /> 4.9 rating
              </span>
            </div>
          </div>
          <Link href={user?.handle?.startsWith("@") ? `/talents/${user.handle.slice(1)}` : "/talents"}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors shrink-0">
            <ExternalLink className="w-3 h-3" />
            Public profile
          </Link>
        </div>

        {/* Fields */}
        <div className="px-6 py-2">
          {fields.map((f) => (
            <div key={f.label} className="db-profile-field">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 pt-0.5">{f.label}</span>
              <span className="font-mono text-[12px]">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/talents/mayareads"
          className="inline-flex items-center gap-2 btn-primary" style={{ fontSize: "11px", padding: "0.55rem 1.25rem" }}>
          View public profile <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link href="/talents/apply"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors">
          Edit creator details <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ── Brand Creators Panel (shortlist) ────────────────────────── */
function BrandCreatorsPanel() {
  const [saved, setSaved] = React.useState<string[]>(["mayareads", "priyaedits"]);
  return (
    <div className="db-tab-section">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ your shortlist</p>
          <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Saved creators.
          </h2>
        </div>
        <Link href="/talents"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors self-start md:self-auto">
          Browse all creators <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="db-shortlist-grid">
        {SHORTLISTED.map((c) => {
          const isSaved = saved.includes(c.handle);
          return (
            <div key={c.handle} className="db-shortlist-card">
              {/* Photo */}
              <div className="relative" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img src={c.photo} alt={c.name}
                  className="w-full h-full object-cover" />
                {/* Match badge */}
                <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", color: "#000" }}>
                  {c.match}% match
                </span>
                {/* Save button */}
                <button
                  onClick={() => setSaved(isSaved ? saved.filter(h => h !== c.handle) : [...saved, c.handle])}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isSaved ? "var(--color-accent)" : "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(6px)",
                    border: isSaved ? "1.5px solid var(--color-fg)" : "1.5px solid rgba(0,0,0,0.15)",
                  }}
                  aria-label={isSaved ? "Remove from shortlist" : "Add to shortlist"}>
                  <Star className="w-3 h-3" fill={isSaved ? "#000" : "none"}
                    stroke={isSaved ? "#000" : "rgba(0,0,0,0.5)"} />
                </button>
              </div>
              {/* Info */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display italic text-lg leading-tight truncate">{c.name}</p>
                  <p className="font-mono text-[10px] opacity-50 mt-0.5 truncate">{c.title} · {c.followers} {c.platform}</p>
                </div>
                <Link href={`/talents/${c.handle}`}
                  className="w-8 h-8 rounded-full border-2 border-(--color-fg) flex items-center justify-center hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-40 mt-8 text-center">
        {SHORTLISTED.length} creators · {saved.length} saved to shortlist
      </p>
    </div>
  );
}

/* ── Settings Panel ──────────────────────────────────────────── */
function SettingsPanel({ isCreator }: { isCreator: boolean }) {
  const [notifs, setNotifs] = React.useState({ email: true, push: true, weekly: false });
  const [danger, setDanger] = React.useState(false);

  return (
    <div className="db-tab-section">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">✦ account</p>
        <h2 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
          Settings.
        </h2>
      </div>

      {/* Notification preferences */}
      <div className="border-2 border-(--color-fg) rounded-2xl overflow-hidden mb-6"
        style={{ boxShadow: "4px 4px 0 0 var(--color-fg)" }}>
        <div className="px-6 py-4 border-b-2 border-(--color-fg)" style={{ background: "var(--color-panel)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70 flex items-center gap-2">
            <Bell className="w-3.5 h-3.5" /> Notification preferences
          </p>
        </div>
        <div className="px-6 py-2">
          {[
            { key: "email" as const,  label: "Email notifications",        sub: "Campaigns, payouts, updates",     icon: Mail       },
            { key: "push"  as const,  label: "Push notifications",         sub: "Real-time alerts on your phone",  icon: Smartphone },
            { key: "weekly" as const, label: "Weekly digest",              sub: "Summary every Monday morning",    icon: Globe      },
          ].map(({ key, label, sub, icon: Icon }) => (
            <div key={key} className="db-settings-toggle">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 opacity-40 shrink-0" />
                <div>
                  <p className="font-mono text-[12px] font-semibold">{label}</p>
                  <p className="font-mono text-[10px] opacity-45 mt-0.5">{sub}</p>
                </div>
              </div>
              <button
                className="db-toggle-switch"
                data-on={notifs[key] ? "true" : "false"}
                onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                aria-label={`Toggle ${label}`}
                aria-pressed={notifs[key]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="border-2 border-(--color-fg) rounded-2xl overflow-hidden mb-6"
        style={{ boxShadow: "4px 4px 0 0 var(--color-fg)" }}>
        <div className="px-6 py-4 border-b-2 border-(--color-fg)" style={{ background: "var(--color-panel)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-70 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" /> {isCreator ? "Payout method" : "Billing"}
          </p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-(--color-fg) flex items-center justify-center"
              style={{ background: "var(--color-panel)" }}>
              <CreditCard className="w-4 h-4 opacity-50" />
            </div>
            <div>
              <p className="font-mono text-[12px] font-semibold">
                {isCreator ? "PayPal — maya.r@example.com" : "Visa ending in 4242"}
              </p>
              <p className="font-mono text-[10px] opacity-45 mt-0.5">
                {isCreator ? "Payouts arrive within 48h of approval" : "Next invoice: Jun 1, 2026 — $299/mo"}
              </p>
            </div>
          </div>
          <button className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors shrink-0">
            {isCreator ? "Update" : "Manage"}
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="border-2 rounded-2xl overflow-hidden"
        style={{ borderColor: "oklch(0.65 0.2 25)", boxShadow: `4px 4px 0 0 oklch(0.65 0.2 25 / ${danger ? "1" : "0.3"})` }}>
        <button
          onClick={() => setDanger(!danger)}
          className="w-full px-6 py-4 flex items-center justify-between border-b-2 transition-colors"
          style={{
            borderColor: "oklch(0.65 0.2 25)",
            background: danger ? "oklch(0.65 0.2 25 / 0.08)" : "transparent",
          }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-2"
            style={{ color: "oklch(0.65 0.2 25)" }}>
            Danger zone
          </p>
          <ChevronRight className="w-3.5 h-3.5 transition-transform" style={{
            color: "oklch(0.65 0.2 25)",
            transform: danger ? "rotate(90deg)" : "rotate(0deg)",
          }} />
        </button>
        {danger && (
          <div className="px-6 py-5 flex flex-col gap-3">
            <p className="font-mono text-[11px] opacity-60 leading-relaxed">
              Deleting your account permanently removes your profile, campaign history, and pending payouts. This cannot be undone.
            </p>
            <button className="self-start font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border-2 hover:opacity-80 transition-opacity"
              style={{ borderColor: "oklch(0.65 0.2 25)", color: "oklch(0.65 0.2 25)" }}>
              Delete account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* MESSAGES / CHAT                                                */
/* ────────────────────────────────────────────────────────────── */

type ChatMsg = {
  id: string;
  sender: "brand" | "creator" | "system";
  type: "text" | "file" | "system" | "milestone";
  content: string;
  time: string;
  file?: { name: string; type: "image" | "video" | "document" };
  milestoneActions?: ("approve" | "revise")[];
};

type ChatThread = {
  id: string;
  name: string;           // brand/creator name
  initial: string;        // avatar letter
  campaign: string;       // campaign name
  lastMessage: string;
  lastTime: string;
  unread: number;
  milestones: { label: string; status: "done" | "active" | "pending" }[];
  messages: ChatMsg[];
};

const CHAT_THREADS: ChatThread[] = [
  {
    id: "t1",
    name: "Chamberlain Coffee",
    initial: "C",
    campaign: "Summer Cold Brew UGC",
    lastMessage: "Content approved — payout triggered!",
    lastTime: "2h ago",
    unread: 2,
    milestones: [
      { label: "Brief", status: "done" },
      { label: "Matched", status: "done" },
      { label: "Draft", status: "done" },
      { label: "Approved", status: "active" },
      { label: "Live", status: "pending" },
      { label: "Paid", status: "pending" },
    ],
    messages: [
      { id: "m1", sender: "system", type: "system", content: "Brief approved", time: "May 20, 10:32am" },
      { id: "m2", sender: "system", type: "system", content: "Creator matched: @mayareads", time: "May 20, 2:15pm" },
      { id: "m3", sender: "brand", type: "text", content: "Hey Maya! Excited to work together. The main thing is a strong hook in the first 3 seconds — we want that scroll-stopping energy.", time: "10:45am" },
      { id: "m3b", sender: "brand", type: "file", content: "Brief attached", time: "10:45am", file: { name: "summer-brief-v2.pdf", type: "document" } },
      { id: "m4", sender: "creator", type: "text", content: "Love it! I have so many ideas already. Quick Q — are you shipping the product to me or do I use my own?", time: "11:02am" },
      { id: "m5", sender: "brand", type: "text", content: "We'll ship it! DM us your address and we'll get a box out tomorrow. Should arrive by Thursday.", time: "11:18am" },
      { id: "m6", sender: "creator", type: "text", content: "Perfect, just sent it. I'll start shooting as soon as it arrives!", time: "11:24am" },
      { id: "m7", sender: "system", type: "milestone", content: "Draft submitted", time: "May 22, 3:45pm", file: { name: "chamberlain-draft1.mp4", type: "video" }, milestoneActions: ["approve", "revise"] },
      { id: "m8", sender: "brand", type: "text", content: "This is great! The hook is perfect. One small note — can you add the discount code overlay at 0:42?", time: "4:10pm" },
      { id: "m9", sender: "creator", type: "text", content: "Done! Updated version uploading now.", time: "5:30pm" },
      { id: "m10", sender: "creator", type: "file", content: "Updated draft", time: "5:32pm", file: { name: "chamberlain-final.mp4", type: "video" } },
      { id: "m11", sender: "system", type: "system", content: "Content approved by Chamberlain Coffee", time: "May 22, 6:01pm" },
      { id: "m12", sender: "system", type: "system", content: "Payout of $850 triggered — arrives in 48h", time: "May 22, 6:01pm" },
    ],
  },
  {
    id: "t2",
    name: "Nike Running",
    initial: "N",
    campaign: "Morning Ritual Series",
    lastMessage: "Uploaded the revised cut — check when you can!",
    lastTime: "1d ago",
    unread: 1,
    milestones: [
      { label: "Brief", status: "done" },
      { label: "Matched", status: "done" },
      { label: "Draft", status: "active" },
      { label: "Approved", status: "pending" },
      { label: "Live", status: "pending" },
      { label: "Paid", status: "pending" },
    ],
    messages: [
      { id: "n1", sender: "system", type: "system", content: "Brief approved", time: "May 18, 9:00am" },
      { id: "n2", sender: "system", type: "system", content: "Creator matched: @mayareads", time: "May 18, 11:30am" },
      { id: "n3", sender: "brand", type: "text", content: "Welcome aboard! We're looking for an authentic morning run vibe — nothing too polished, real energy.", time: "12:15pm" },
      { id: "n4", sender: "creator", type: "text", content: "That's literally my entire brand. I'll capture my actual morning routine this week.", time: "12:42pm" },
      { id: "n5", sender: "system", type: "milestone", content: "Draft submitted", time: "May 21, 8:20am", file: { name: "nike-morning-v1.mp4", type: "video" }, milestoneActions: ["approve", "revise"] },
      { id: "n6", sender: "brand", type: "text", content: "Love the energy! Could you try a version where the product appears earlier — within the first 5 seconds?", time: "2:30pm" },
      { id: "n7", sender: "creator", type: "text", content: "Uploaded the revised cut — check when you can!", time: "May 22, 9:15am" },
      { id: "n8", sender: "creator", type: "file", content: "Revised draft", time: "May 22, 9:15am", file: { name: "nike-morning-v2.mp4", type: "video" } },
    ],
  },
  {
    id: "t3",
    name: "Penguin Random House",
    initial: "P",
    campaign: "Summer Reading List",
    lastMessage: "Brief details attached. Let us know if you have questions!",
    lastTime: "3d ago",
    unread: 0,
    milestones: [
      { label: "Brief", status: "done" },
      { label: "Matched", status: "done" },
      { label: "Draft", status: "pending" },
      { label: "Approved", status: "pending" },
      { label: "Live", status: "pending" },
      { label: "Paid", status: "pending" },
    ],
    messages: [
      { id: "p1", sender: "system", type: "system", content: "Brief approved", time: "May 19, 3:00pm" },
      { id: "p2", sender: "system", type: "system", content: "Creator matched: @mayareads", time: "May 19, 4:45pm" },
      { id: "p3", sender: "brand", type: "text", content: "Hi Maya! We loved your BookTok content. For this campaign, we want a \"summer reading stack\" format — casual, cozy, aspirational.", time: "5:10pm" },
      { id: "p4", sender: "brand", type: "file", content: "Brief details attached. Let us know if you have questions!", time: "5:10pm", file: { name: "prh-summer-brief.pdf", type: "document" } },
    ],
  },
];

function MessagesPanel({ isCreator }: { isCreator: boolean }) {
  const [activeThread, setActiveThread] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);
  const messagesRef = React.useRef<HTMLDivElement>(null);
  const thread = CHAT_THREADS.find((t) => t.id === activeThread);

  // Scroll to bottom when thread opens
  React.useEffect(() => {
    if (activeThread && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [activeThread]);

  // Auto-clear toast
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  const showToast = (msg: string) => setToast(msg);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    showToast("Message sent");
  };

  const totalUnread = CHAT_THREADS.reduce((n, t) => n + t.unread, 0);

  return (
    <div className="db-chat-layout" data-thread-open={activeThread ? "true" : "false"}>
      {/* ── Thread list ───────────────────────────────────── */}
      <div className="db-chat-threads" role="listbox" aria-label="Message threads">
        {/* Header */}
        <div className="px-5 py-4 border-b border-(--color-border)">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display italic text-2xl leading-none">Messages</h2>
            {totalUnread > 0 && (
              <Chip asSpan variant="solid" size="xs" aria-label={`${totalUnread} unread`}>{totalUnread}</Chip>
            )}
          </div>
          <MonoLabel size="sm" opacity={50}>✦ {CHAT_THREADS.length} campaign conversations</MonoLabel>
        </div>
        {/* Threads */}
        {CHAT_THREADS.map((t) => (
          <button
            key={t.id}
            className="db-chat-thread"
            role="option"
            aria-selected={activeThread === t.id}
            aria-label={`${t.name} — ${t.campaign}${t.unread > 0 ? `, ${t.unread} unread` : ""}`}
            data-active={activeThread === t.id ? "true" : "false"}
            onClick={() => setActiveThread(t.id)}
          >
            <Avatar initial={t.initial} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <MonoLabel size="md" weight="semibold" className="truncate">{t.name}</MonoLabel>
                <MonoLabel size="xs" opacity={45} className="shrink-0">{t.lastTime}</MonoLabel>
              </div>
              <p className="font-sans text-[12px] opacity-60 truncate leading-snug">{t.lastMessage}</p>
              {/* Milestone chips */}
              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                {t.milestones.filter((m) => m.status === "done" || m.status === "active").map((m) => (
                  <Chip
                    key={m.label}
                    asSpan
                    size="xs"
                    variant={m.status === "active" ? "active" : "done"}
                  >
                    {m.status === "done" ? "✓ " : "● "}{m.label}
                  </Chip>
                ))}
              </div>
            </div>
            {t.unread > 0 && (
              <Chip asSpan variant="solid" size="xs" aria-hidden="true" className="shrink-0">{t.unread}</Chip>
            )}
          </button>
        ))}
      </div>

      {/* ── Chat view ─────────────────────────────────────── */}
      {thread ? (
        <div className="db-chat-view" role="log" aria-label={`Conversation with ${thread.name}`}>
          {/* Chat header */}
          <div className="db-chat-header">
            <IconButton
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
              aria-label="Back to thread list"
              size="sm"
              variant="outline"
              className="db-chat-back"
              onClick={() => setActiveThread(null)}
            />
            <Avatar initial={thread.initial} size="sm" />
            <div className="flex-1 min-w-0">
              <MonoLabel size="md" weight="semibold" as="p" className="truncate">{thread.name}</MonoLabel>
              <MonoLabel size="xs" opacity={45} as="p" className="truncate">{thread.campaign}</MonoLabel>
            </div>
          </div>

          {/* Milestone strip */}
          <div className="db-chat-milestones" role="progressbar" aria-label="Campaign milestones" aria-valuenow={thread.milestones.filter((m) => m.status === "done").length} aria-valuemax={thread.milestones.length}>
            {thread.milestones.map((m, i) => (
              <div key={m.label} className="flex items-center" title={m.label}>
                <div
                  className="db-chat-ms-dot"
                  data-done={m.status === "done" ? "true" : "false"}
                  data-active={m.status === "active" ? "true" : "false"}
                  aria-label={`${m.label}: ${m.status}`}
                />
                {i < thread.milestones.length - 1 && (
                  <div className="db-chat-ms-line" data-done={m.status === "done" ? "true" : "false"} />
                )}
              </div>
            ))}
            <span className="db-chat-ms-label">
              {thread.milestones.find((m) => m.status === "active")?.label ?? "Complete"}
            </span>
          </div>

          {/* Messages */}
          <div className="db-chat-messages" ref={messagesRef}>
            {thread.messages.map((msg) => {
              if (msg.type === "system") {
                return (
                  <div key={msg.id} className="db-chat-system" role="status">
                    <Check className="w-3 h-3" />
                    <span>{msg.content}</span>
                    <span style={{ opacity: 0.6 }}>· {msg.time}</span>
                  </div>
                );
              }
              if (msg.type === "milestone") {
                return (
                  <StickerCard
                    key={msg.id}
                    radius="md"
                    padding="md"
                    className="my-2 self-stretch"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkle size={16} fill="var(--color-accent)" />
                      <MonoLabel size="sm" weight="semibold">✦ {msg.content}</MonoLabel>
                      <MonoLabel size="xs" opacity={45} className="ml-auto">{msg.time}</MonoLabel>
                    </div>
                    {msg.file && (
                      <FileChip name={msg.file.name} type={msg.file.type} onOpen={() => showToast(`Opening ${msg.file?.name}`)} />
                    )}
                    {msg.milestoneActions && (
                      <div className="flex items-center gap-2 mt-3">
                        {msg.milestoneActions.includes("approve") && (
                          <button
                            className="btn-primary"
                            style={{ fontSize: "10px", padding: "0.4rem 0.85rem" }}
                            onClick={() => showToast("Content approved ✓")}
                          >
                            <Check className="w-3 h-3" /> Approve
                          </button>
                        )}
                        {msg.milestoneActions.includes("revise") && (
                          <button
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors"
                            onClick={() => showToast("Revision requested")}
                          >
                            Request revision
                          </button>
                        )}
                      </div>
                    )}
                  </StickerCard>
                );
              }
              // text or file message
              const isSelf = (isCreator && msg.sender === "creator") || (!isCreator && msg.sender === "brand");
              return (
                <div key={msg.id} className="flex flex-col" style={{ alignItems: isSelf ? "flex-end" : "flex-start" }}>
                  <div className="db-chat-bubble" data-self={isSelf ? "true" : "false"}>
                    <p>{msg.content}</p>
                    {msg.file && (
                      <div className="mt-2">
                        <FileChip name={msg.file.name} type={msg.file.type} onOpen={() => showToast(`Opening ${msg.file?.name}`)} />
                      </div>
                    )}
                  </div>
                  <MonoLabel size="xs" opacity={35} className="mt-1 px-1">{msg.time}</MonoLabel>
                </div>
              );
            })}
          </div>

          {/* Toast — using InlineToast primitive */}
          <InlineToast message={toast} onDismiss={() => setToast(null)} position="bottom-center" />

          {/* Composer */}
          <div className="db-chat-composer">
            <IconButton
              icon={<Paperclip className="w-3.5 h-3.5 opacity-60" />}
              aria-label="Attach file"
              size="md"
              variant="ghost"
            />
            <textarea
              className="db-chat-input"
              placeholder="Type a message..."
              aria-label="Message input"
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="db-chat-send" aria-label="Send message" onClick={handleSend}>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty state — no thread selected (desktop only via CSS) */
        <div className="db-chat-empty">
          <EmptyState
            icon={<MessageSquare className="w-full h-full" />}
            title="Select a conversation"
            caption={`${CHAT_THREADS.length} active campaign threads`}
            size="md"
          />
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* PAGE                                                           */
/* ────────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const router  = useRouter();
  const rootRef = React.useRef<HTMLDivElement>(null);

  const authStatus = useAuthStore((s) => s.status);
  const authUser   = useAuthStore((s) => s.user);
  const currentUser = useCurrentUser();
  const { logout } = useAuthActions();

  const [authed,          setAuthed]          = React.useState(false);
  const [mode,            setMode]            = React.useState<"creator" | "brand">("creator");
  const [activeNav,       setActiveNav]       = React.useState("overview");
  const [mobileOpen,      setMobileOpen]      = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [bellOpen,        setBellOpen]        = React.useState(false);
  const bellRef = React.useRef<HTMLDivElement>(null);

  // Sync activeNav with ?tab= query param on mount (deep-linking)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) requestAnimationFrame(() => setActiveNav(tab));
  }, []);

  const navigateTab = (id: string) => {
    setActiveNav(id);
    // Update URL without triggering Next.js router events (avoids page transition)
    const params = new URLSearchParams(window.location.search);
    if (id === "overview") params.delete("tab");
    else params.set("tab", id);
    const qs = params.toString();
    const url = `/dashboard${qs ? `?${qs}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  };

  // Close bell flyout on outside click
  React.useEffect(() => {
    if (!bellOpen) return;
    function handle(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [bellOpen]);

  // Auth gate — driven by the NextAuth-backed Zustand store.
  // Redirect to /login once we know the user is unauthenticated.
  React.useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus === "unauthenticated" || !authUser) {
      router.replace("/login");
      return;
    }
    setMode(authUser.role === "brand" ? "brand" : "creator");
    setAuthed(true);
  }, [authStatus, authUser, router]);

  // Sign out — clear the session (NextAuth + store) and return to login.
  async function handleSignOut() {
    await logout();
    router.push("/login");
  }

  // Demo: view the dashboard as the other role without changing the account.
  // (Account role is owned by the backend; this only swaps the local view.)
  function handleSwitchRole(next: "creator" | "brand") {
    if (next === mode) return;
    setMode(next);
    navigateTab("overview");
  }

  /* ── Animations (must be before any early return) ───────────── */
  useGSAP(
    () => {
      if (!authed) return;
      // 1. Greeting words
      gsap.fromTo(".db-greet-word",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic, stagger: stagger.normal, delay: 0.05 },
      );
      // 2. Focus strip
      gsap.fromTo(".db-focus-strip",
        { xPercent: -2, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: dur.slow, ease: ease.out, delay: 0.4 },
      );
      // 3. Stats cells
      gsap.fromTo(".db-stat-cell",
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic, stagger: stagger.normal, delay: 0.2 },
      );
      // 4. Featured card
      gsap.fromTo(".db-featured",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic,
          scrollTrigger: { trigger: ".db-featured", start: "top 90%", once: true } },
      );
      // 5. Campaign cards
      ScrollTrigger.batch(".db-campaign-card", {
        start: "top 88%",
        onEnter: (els) =>
          gsap.fromTo(els,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic, stagger: stagger.wide, overwrite: "auto" },
          ),
      });
      // 6. Activity rows — clip-path wipe (belief-row pattern)
      gsap.utils.toArray<HTMLElement>(".db-activity-row").forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 0 100% 0)", y: 12 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: dur.base, ease: ease.out, delay: i * 0.07,
            scrollTrigger: { trigger: ".db-activity-list", start: "top 88%", once: true } },
        );
      });
      // 7. Quick actions
      gsap.fromTo(".db-action-row",
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: 0.08,
          scrollTrigger: { trigger: ".db-actions-panel", start: "top 88%", once: true } },
      );
    },
    { scope: rootRef, dependencies: [authed] },
  );

  if (!authed) return (
    <div className="min-h-svh bg-(--color-bg) flex flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        {/* Logo skeleton */}
        <div className="w-10 h-10 rounded-full border-2 border-(--color-fg) animate-pulse" style={{ background: "var(--color-panel)" }} />
        {/* Line skeletons */}
        {[80, 60, 70].map((w, i) => (
          <div
            key={i}
            className="rounded-full animate-pulse"
            style={{
              height: 10,
              width: `${w}%`,
              background: "var(--color-panel)",
              animationDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "color-mix(in srgb, var(--color-fg) 35%, transparent)" }}>
        Loading workspace…
      </p>
    </div>
  );

  const data      = mode === "creator" ? creatorData : brandData;
  const isCreator = mode === "creator";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const quickActions = isCreator ? [
    { label: "Browse new briefs",   href: "/talents",           icon: FileText   },
    { label: "Update your profile", href: "/talents/mayareads", icon: Users      },
    { label: "View payout history", href: "#",                   icon: DollarSign },
    { label: "Platform settings",   href: "#",                   icon: Settings   },
  ] : [
    { label: "Build a new brief",   href: "/brief-builder",      icon: FileText   },
    { label: "Browse all creators", href: "/talents",           icon: Users      },
    { label: "View analytics",      href: "#",                   icon: BarChart2  },
    { label: "Campaign settings",   href: "#",                   icon: Settings   },
  ];

  return (
    <div ref={rootRef} className="db-root" data-collapsed={sidebarCollapsed ? "true" : "false"}>
      <style>{PAGE_STYLES}</style>

      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <aside className="db-sidebar">
        <SidebarContent mode={mode} active={activeNav} onNav={navigateTab} onSignOut={handleSignOut} user={currentUser} />
      </aside>

      {/* ── Mobile overlay ──────────────────────────────────────── */}
      {mobileOpen && (
        <div className="db-sidebar-mobile">
          <div className="w-72 max-w-[85vw] flex flex-col h-full overflow-y-auto border-r-2 border-(--color-fg)"
            style={{ background: "var(--color-bg)" }}>
            <SidebarContent mode={mode} active={activeNav} onNav={navigateTab} onClose={() => setMobileOpen(false)} onSignOut={handleSignOut} user={currentUser} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* ── Main column (this is the scroll container) ──────────── */}
      <div className="db-main" data-lenis-prevent style={activeNav === "messages" ? { overflow: "hidden" } : undefined}>

        {/* ── Sticky top bar ──────────────────────────────────── */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 py-3.5 border-b-2 border-(--color-fg)"
          style={{ background: "var(--color-bg)" }}>
          <div className="flex items-center gap-4">
            {/* Sidebar toggle — opens mobile overlay on small screens, collapses sidebar on desktop */}
            <button
              className="db-sidebar-btn inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors"
              onClick={() => {
                // < 1024px → mobile overlay; >= 1024px → collapse/expand
                if (window.innerWidth < 1024) setMobileOpen(true);
                else setSidebarCollapsed(!sidebarCollapsed);
              }}
              aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}>
              <Menu className="w-4 h-4 db-sidebar-btn-menu" />
              <ChevronRight className="w-4 h-4 db-sidebar-btn-chevron" style={{ transform: sidebarCollapsed ? "none" : "rotate(180deg)", transition: "transform 0.3s" }} />
            </button>
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span className="db-live-dot w-2 h-2 rounded-full" style={{ background: "var(--color-accent)" }} />
              <span className="font-mono font-semibold text-[11px] uppercase tracking-[0.25em] opacity-80">
                {isCreator ? "Creator dashboard" : "Brand dashboard"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Demo role switcher */}
            <div
              className="hidden sm:flex items-center gap-1 rounded-full px-1 py-1 border"
              style={{ borderColor: "var(--color-border)", background: "var(--color-panel)" }}
              title="Demo: switch view"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 opacity-40 select-none">
                Demo
              </span>
              {(["creator", "brand"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleSwitchRole(r)}
                  className="font-mono text-[9px] uppercase tracking-[0.15em] px-3 py-1 rounded-full transition-all duration-150"
                  style={mode === r
                    ? { background: "var(--color-fg)", color: "var(--color-bg)" }
                    : { color: "var(--color-muted-fg)" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>

            <div ref={bellRef} className="relative">
              <button
                onClick={() => setBellOpen(!bellOpen)}
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors"
                aria-label="Notifications"
                aria-expanded={bellOpen}>
                <Bell className="w-4 h-4" />
                {!bellOpen && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full border-2 border-(--color-bg)"
                    style={{ background: "var(--color-accent)" }} />
                )}
              </button>

              {bellOpen && (
                <div className="db-bell-flyout">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b-2 border-(--color-fg)"
                    style={{ background: "var(--color-panel)" }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold">Notifications</p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                      style={{ background: "color-mix(in srgb, var(--color-accent) 20%, transparent)", color: "var(--color-accent)" }}>
                      {(isCreator ? CREATOR_NOTIFS : BRAND_NOTIFS).filter(n => n.unread).length} new
                    </span>
                  </div>
                  {/* Items */}
                  {(isCreator ? CREATOR_NOTIFS : BRAND_NOTIFS).map((n, i) => (
                    <div key={i} className="db-notif-row">
                      <div className="db-notif-icon"
                        style={{ background: n.icon === "paid" ? "var(--color-accent)" : "var(--color-panel)" }}>
                        {n.icon === "paid"  && <DollarSign className="w-3.5 h-3.5" />}
                        {n.icon === "check" && <Check className="w-3.5 h-3.5" />}
                        {n.icon === "brief" && <FileText className="w-3.5 h-3.5" />}
                        {n.icon === "clock" && <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[11px] font-semibold leading-snug">{n.text}</p>
                        <p className="font-mono text-[10px] opacity-45 mt-0.5">{n.sub}</p>
                      </div>
                      {n.unread && <span className="db-notif-dot shrink-0" />}
                    </div>
                  ))}
                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-(--color-border)">
                    <button onClick={() => setBellOpen(false)}
                      className="w-full font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-80 transition-opacity">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Link href={isCreator ? "/talents" : "/brief-builder"}
              className="hidden sm:inline-flex items-center gap-2 btn-primary"
              style={{ fontSize: "11px", padding: "0.45rem 1rem" }}>
              {isCreator ? "Browse briefs" : "New campaign"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* ── Content ─────────────────────────────────────────── */}
        <main className="flex-1" style={activeNav === "messages" ? { display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" } : undefined}>

        {/* ── Overview tab (welcome + stats + priority content) ─ */}
        {activeNav === "overview" && (<>
        {/* Welcome section */}
        <section className="relative px-6 md:px-10 pt-10 pb-10 border-b-2 border-(--color-fg) bracket-frame dot-grid"
          style={{ background: "var(--color-bg)" }}>
          <div aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[100px] opacity-15 z-0"
            style={{ background: "var(--accent)" }} />
          <Sparkle size={40} fill="var(--accent2)" className="absolute top-6 right-[8%] rotate-12 opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <p className="font-mono font-semibold text-[11px] tracking-[0.32em] uppercase opacity-70 mb-5">{today}</p>
            <h1 className="font-display italic leading-[0.9] tracking-[-0.03em] mb-6"
              style={{ fontSize: "clamp(2.4rem,6vw,5.5rem)" }}>
              {[greeting + ",", (currentUser?.firstName ?? "there") + "."].map((word, i) => (
                <span key={i} className="db-greet-word inline-block mr-[0.22em] last:mr-0 relative">
                  {i === 1 && (
                    <span aria-hidden className="absolute inset-x-0 bottom-[0.06em] h-[0.22em] rounded-sm -z-10"
                      style={{ background: "var(--accent4)" }} />
                  )}
                  {word}
                </span>
              ))}
            </h1>
            <div className="db-focus-strip sticker inline-flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 max-w-full" data-tone="ink">
              <Zap className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-semibold text-[10px] uppercase tracking-[0.18em] opacity-75">{data.focus.label}</span>
                <span className="font-display italic text-lg leading-none">{data.focus.value}</span>
              </div>
              <Link href={data.focus.href}
                className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}>
                {data.focus.cta}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}>
          <div className="db-stats-grid max-w-7xl mx-auto">
            {data.stats.map((s) => (
              <div key={s.label} className="db-stat-cell">
                <div className="font-display italic leading-none mb-2"
                  style={{ fontSize: "clamp(1.7rem,2.8vw,2.6rem)", color: "var(--color-accent)" }}>
                  {s.value}
                </div>
                <div className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] mb-1.5"
                  style={{ color: "color-mix(in srgb, var(--color-bg) 85%, transparent)" }}>
                  {s.label}
                </div>
                <div className="font-mono font-semibold text-[10px]"
                  style={{ color: s.up ? "var(--color-accent)" : "color-mix(in srgb, var(--color-bg) 55%, transparent)" }}>
                  {s.up ? "↑" : "—"} {s.delta}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto w-full">

          {/* ── Featured (priority) campaign ──────────────────── */}
          <section className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-mono font-semibold text-[12px] tracking-[0.28em] uppercase mb-2 opacity-80">
                  ✦ priority now
                </p>
                <h2 className="font-display italic leading-[0.95] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}>
                  What needs your attention.
                </h2>
              </div>
            </div>

            <div className="db-featured sticker p-8 md:p-10 relative overflow-hidden" data-tone="cream">
              {/* Watermark number */}
              <span aria-hidden
                className="absolute -bottom-4 -right-2 font-display italic leading-none pointer-events-none select-none"
                style={{ fontSize: "clamp(5rem,14vw,11rem)", opacity: 0.08 }}>
                01
              </span>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  {/* Status + tag */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 font-mono font-semibold text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border-2 border-(--color-fg)">
                      <span className="db-live-dot w-1.5 h-1.5 rounded-full bg-(--color-fg)" />
                      Active
                    </span>
                    <span className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] opacity-75">
                      {data.featured.tag}
                    </span>
                  </div>

                  {/* Brand + brief */}
                  <h3 className="font-display italic leading-tight mb-3"
                    style={{ fontSize: "clamp(1.4rem,3vw,2.5rem)" }}>
                    {data.featured.brand}
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed opacity-65 max-w-xl mb-5">
                    {data.featured.brief}
                  </p>

                  {/* Action note */}
                  <div className="inline-flex items-start gap-2.5 px-4 py-3 rounded-xl border-2 border-(--color-fg)">
                    <Clock className="w-3.5 h-3.5 shrink-0 mt-px" />
                    <p className="font-mono font-semibold text-[11px] uppercase tracking-[0.15em] leading-relaxed">
                      {data.featured.note}
                    </p>
                  </div>
                </div>

                {/* Budget + due */}
                <div className="flex flex-row md:flex-col items-start gap-6 md:gap-4 shrink-0">
                  <div>
                    <p className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] opacity-75 mb-1">Budget</p>
                    <p className="font-display italic leading-none" style={{ fontSize: "clamp(2rem,3vw,2.8rem)" }}>
                      {data.featured.budget}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] opacity-75 mb-1">Timeline</p>
                    <p className="font-display italic text-xl leading-tight">{data.featured.due}</p>
                  </div>
                  <Link href="#"
                    className="btn-primary hidden md:inline-flex"
                    style={{ fontSize: "11px", padding: "0.45rem 1.1rem" }}>
                    {isCreator ? "Upload content" : "Review creators"}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── Other campaigns ───────────────────────────────── */}
          <section className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-mono font-semibold text-[12px] tracking-[0.28em] uppercase mb-2 opacity-80">
                  in progress
                </p>
                <h2 className="font-display italic leading-[0.95] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)" }}>
                  {isCreator ? "Other campaigns." : "More campaigns."}
                </h2>
              </div>
              <Link href={isCreator ? "/talents" : "/brief-builder"}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] hover:opacity-60 transition-opacity pb-1">
                {isCreator ? "All briefs" : "New campaign"}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="db-cards-grid">
              {data.campaigns.map((c, i) => (
                <CampaignCard key={i} {...c} />
              ))}
            </div>
          </section>

          {/* ── Bottom row: activity + actions ────────────────── */}
          <div className="db-bottom-grid">

            {/* Activity feed */}
            <section>
              <p className="font-mono font-semibold text-[12px] tracking-[0.28em] uppercase mb-2 opacity-80">recent activity</p>
              <h2 className="font-display italic leading-[0.95] tracking-[-0.02em] mb-8"
                style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)" }}>
                What&apos;s happened.
              </h2>

              <div className="db-activity-list border-t-2 border-(--color-fg)">
                {data.activity.map(({ group, items }) => (
                  <div key={group}>
                    {/* Day group label */}
                    <div className="flex items-center gap-3 py-3 border-b border-(--color-border)">
                      <span className="font-mono font-bold text-[10px] uppercase tracking-[0.28em] opacity-75">{group}</span>
                      <span className="font-mono font-semibold text-[10px] opacity-45">— {items.length} event{items.length > 1 ? "s" : ""}</span>
                    </div>
                    {items.map((a, i) => (
                      <div key={i} className="db-activity-row">
                        <ActivityIcon type={a.icon} />
                        <p className="font-sans text-[14px] leading-relaxed flex-1">{a.text}</p>
                        <ChevronRight className="w-3.5 h-3.5 opacity-20 shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                ))}
                {/* View all */}
                <div className="pt-5">
                  <Link href="#"
                    className="inline-flex items-center gap-1.5 font-mono font-semibold text-[10px] uppercase tracking-[0.22em] opacity-50 hover:opacity-90 transition-opacity">
                    View full history
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Quick actions + badge */}
            <section>
              <p className="font-mono font-semibold text-[12px] tracking-[0.28em] uppercase mb-2 opacity-80">quick actions</p>
              <h2 className="font-display italic leading-[0.95] tracking-[-0.02em] mb-8"
                style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)" }}>
                Jump to.
              </h2>

              {/* Actions panel */}
              <div className="db-actions-panel border-2 border-(--color-fg) rounded-2xl overflow-hidden mb-5"
                style={{ boxShadow: "4px 4px 0 0 var(--color-fg)" }}>
                {quickActions.map(({ label, href, icon: Icon }, i) => (
                  <Link key={label} href={href} className="db-action-row">
                    <span className="font-mono font-semibold text-[10px] opacity-55 w-5 shrink-0">0{i + 1}</span>
                    <Icon className="db-action-icon w-4 h-4 shrink-0 transition-colors duration-200"
                      style={{ color: "var(--color-accent)" }} />
                    <span className="db-action-label font-mono font-semibold text-[12px] uppercase tracking-[0.15em] flex-1 transition-colors duration-200">
                      {label}
                    </span>
                    <ArrowUpRight className="db-action-arrow w-3.5 h-3.5 opacity-35 transition-all duration-200" />
                  </Link>
                ))}
              </div>

              {/* Platform badge — ink sticker */}
              <div className="sticker p-7 relative overflow-hidden" data-tone="ink">
                <Sparkle size={32} fill="var(--color-accent)"
                  className="absolute top-4 right-4 opacity-50 pointer-events-none" />
                <p className="font-mono font-semibold text-[10px] uppercase tracking-[0.28em] mb-3 opacity-70">✦ icons platform</p>
                <p className="font-display italic text-2xl leading-tight mb-3">
                  0% commission.<br />Always.
                </p>
                <p className="font-sans text-[13px] leading-relaxed opacity-80">
                  Every payout goes straight to the creator. Icons earns from subscriptions, not your revenue.
                </p>
                <Link href="/about"
                  className="inline-flex items-center gap-1.5 font-mono font-semibold text-[10px] uppercase tracking-[0.22em] mt-5 hover:opacity-100 transition-opacity opacity-85"
                  style={{ color: "var(--color-accent)" }}>
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </section>
          </div>
        </div>
        </>)}

        {/* ── Campaigns tab ───────────────────────────────────── */}
        {activeNav === "campaigns" && (
          isCreator ? <CreatorCampaignsPanel data={creatorData} /> : <BrandCampaignsPanel data={brandData} />
        )}

        {/* ── Messages tab ────────────────────────────────────── */}
        {activeNav === "messages" && <MessagesPanel isCreator={isCreator} />}

        {/* ── Earnings tab (creator) ───────────────────────────── */}
        {activeNav === "earnings" && isCreator && <CreatorEarningsPanel />}

        {/* ── Analytics tab (brand) ────────────────────────────── */}
        {activeNav === "analytics" && !isCreator && <BrandAnalyticsPanel data={brandData} />}

        {/* ── Creators tab (brand shortlist) ───────────────────── */}
        {activeNav === "creators" && !isCreator && <BrandCreatorsPanel />}

        {/* ── Profile tab ──────────────────────────────────────── */}
        {activeNav === "profile" && isCreator && <CreatorProfilePanel user={currentUser} />}

        {/* ── Settings tab ─────────────────────────────────────── */}
        {activeNav === "settings" && <SettingsPanel isCreator={isCreator} />}

        </main>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="px-6 md:px-10 py-5 border-t-2 border-(--color-fg) mt-8" style={activeNav === "messages" ? { display: "none" } : undefined}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <p className="font-display italic text-xl opacity-50">Icons.</p>
            <div className="flex items-center gap-6">
              {[["Privacy", "/privacy"], ["Terms", "/terms"]].map(([label, href]) => (
                <Link key={label} href={href}
                  className="font-mono font-semibold text-[10px] uppercase tracking-[0.22em] opacity-45 hover:opacity-70 transition-opacity">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
