import { bffFetch } from "./client";
import type { Campaign } from "./admin";

export type CollaborationStatus = "invited" | "accepted" | "declined";

export interface CollabCreator {
  id: string;
  displayName?: string | null;
  handle?: string | null;
  avatarUrl?: string | null;
  email?: string;
}

export interface Collaboration {
  id: string;
  campaignId: string;
  creatorId: string;
  status: CollaborationStatus;
  campaign?: Campaign;
  creator?: CollabCreator;
  createdAt?: string;
}

export const collaborationsApi = {
  forCampaign: (campaignId: string) =>
    bffFetch<Collaboration[]>(`/campaigns/${campaignId}/creators`),
  invite: (campaignId: string, creatorId: string) =>
    bffFetch<Collaboration>(`/campaigns/${campaignId}/creators`, {
      method: "POST",
      body: { creatorId },
    }),
  mine: () => bffFetch<Collaboration[]>("/collaborations/mine"),
  respond: (id: string, status: "accepted" | "declined") =>
    bffFetch<Collaboration>(`/collaborations/${id}`, {
      method: "PATCH",
      body: { status },
    }),
};
