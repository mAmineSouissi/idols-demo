import { bffFetch } from "./client";

/** Chat types — mirror icons-api ResponseConversationDto / ResponseMessageDto. */

export interface ChatUser {
  id: string;
  displayName?: string | null;
  handle?: string | null;
  email?: string;
  avatarUrl?: string | null;
}
export interface ConversationParticipant {
  userId: string;
  user?: ChatUser;
}
export interface ChatMessage {
  id: number;
  content: string;
  conversationId: number;
  userId: string;
  variant: string;
  createdAt?: string;
}
export interface Conversation {
  id: number;
  participants?: ConversationParticipant[];
  lastMessage?: ChatMessage | null;
  updatedAt?: string;
}

interface Page<T> {
  data: T[];
  meta: { itemCount: number };
}

// Conversation list/create stay REST; messaging is real-time over Socket.IO.
export const chatApi = {
  conversations: () => bffFetch<Page<Conversation>>("/chat/conversations"),
  createConversation: (targetUserId: string) =>
    bffFetch<Conversation>("/chat/conversations", {
      method: "POST",
      body: { targetUserId },
    }),
};
