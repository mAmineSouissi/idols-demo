import { bffFetch } from "./client";

/** Aggregated dashboard summaries (auth'd, per-user). Mirror icons-api DTOs. */

export interface BrandDashboard {
  totalCampaigns: number;
  activeCampaigns: number;
  byStatus: Record<string, number>;
}

export interface CreatorDashboard {
  earnedThisMonthCents: number;
  lifetimeEarnedCents: number;
  pendingPayoutCents: number;
  activeCampaigns: number;
  recentPayouts: unknown[];
}

export const dashboardApi = {
  brand: () => bffFetch<BrandDashboard>("/dashboard/brand"),
  creator: () => bffFetch<CreatorDashboard>("/dashboard/creator"),
};
