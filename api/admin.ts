import { bffFetch } from "./client";

/**
 * ADMIN browser-side calls. These hit the same-origin /api/admin/* BFF routes,
 * which attach the admin's backend Bearer token server-side. Mirror the
 * icons-api response DTOs.
 */

export interface PageMeta {
  page: number | null;
  take: number | null;
  itemCount: number;
  pageCount: number | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

export type WaitlistAudience = "talent" | "brand";
export interface WaitlistEntry {
  id: string;
  audience: WaitlistAudience;
  name: string;
  email: string;
  company?: string;
  discipline?: string;
  handle?: string;
  category?: string;
  createdAt?: string;
}

export type TalentApplicationStatus = "pending" | "approved" | "rejected";
export interface TalentApplication {
  id: string;
  name: string;
  email: string;
  primaryPlatform: string;
  handle: string;
  niche?: string;
  category?: string;
  followers?: string;
  engagement?: string;
  formats?: string[];
  why?: string;
  status: TalentApplicationStatus;
  reviewNotes?: string;
  reviewedAt?: string;
  createdAt?: string;
}

export type CampaignStatus =
  | "submitted"
  | "in_review"
  | "matching"
  | "live"
  | "completed"
  | "cancelled";
export interface Campaign {
  id: string;
  brandName: string;
  industry: string;
  campaignType: string;
  budget: string;
  tier: string;
  quantity: string;
  platforms: string[];
  status: CampaignStatus;
  statusNote?: string;
  createdAt?: string;
}

export type EarningStatus = "pending" | "paid";
export interface Earning {
  id: string;
  creatorId: string;
  campaignId?: string;
  amountCents: number;
  status: EarningStatus;
  description?: string;
  paidAt?: string;
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  email?: string;
  displayName?: string;
  handle?: string;
  role?: { id: string; label: string };
  status?: string;
}

export const adminApi = {
  waitlist: () => bffFetch<Page<WaitlistEntry>>("/admin/waitlist"),

  earnings: () => bffFetch<Earning[]>("/admin/earnings"),
  recordEarning: (body: {
    creatorId: string;
    amountCents: number;
    description?: string;
    status?: EarningStatus;
  }) => bffFetch<Earning>("/admin/earnings", { method: "POST", body }),

  users: () => bffFetch<AdminUser[]>("/admin/users"),
  setUserRole: (id: string, role: "Admin" | "creator" | "brand") =>
    bffFetch<AdminUser>(`/admin/users/${id}`, {
      method: "PATCH",
      body: { role },
    }),

  talentApplications: () =>
    bffFetch<Page<TalentApplication>>("/admin/talent-applications"),
  approveApplication: (id: string, reviewNotes?: string) =>
    bffFetch<TalentApplication>(`/admin/talent-applications/${id}`, {
      method: "PATCH",
      body: { action: "approve", reviewNotes },
    }),
  rejectApplication: (id: string, reviewNotes?: string) =>
    bffFetch<TalentApplication>(`/admin/talent-applications/${id}`, {
      method: "PATCH",
      body: { action: "reject", reviewNotes },
    }),

  campaigns: () => bffFetch<Page<Campaign>>("/admin/campaigns"),
  updateCampaignStatus: (
    id: string,
    status: CampaignStatus,
    statusNote?: string,
  ) =>
    bffFetch<Campaign>(`/admin/campaigns/${id}`, {
      method: "PATCH",
      body: { status, statusNote },
    }),
};
