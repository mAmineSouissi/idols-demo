import { bffFetch } from "./client";

export interface AppNotification {
  id: number;
  type: string;
  payload?: { message?: string } | null;
  createdAt?: string;
}

interface Page<T> {
  data: T[];
  meta: { itemCount: number };
}

export const notificationsApi = {
  list: () => bffFetch<Page<AppNotification>>("/notifications"),
  test: () => bffFetch<AppNotification>("/notifications", { method: "POST" }),
};
