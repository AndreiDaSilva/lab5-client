export interface User {
  id: string;
  name: string;
  isMe?: boolean;
}

export interface ChatMessage {
  senderId: string;
  senderName?: string;
  content: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface SendMessagePayload {
  senderId: string;
  pass: string;
  targetId: string;
  msg: string;
}
