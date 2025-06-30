import { BaseFormData } from './common';

// Chat Types
export interface ChatRoomDataType extends BaseFormData {
  chatRoomUuid: string;
  parkingLotUuid: string;
  userUuid: string;
  hostUuid: string;
  parkingLotName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isActive: boolean;
}

export interface ChatMessageDataType extends BaseFormData {
  messageUuid: string;
  chatRoomUuid: string;
  senderUuid: string;
  senderType: 'USER' | 'HOST';
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE';
  isRead: boolean;
}

export interface ChatRoomListResponse {
  chatRooms: ChatRoomDataType[];
  totalCount: number;
}

export interface ChatMessageListResponse {
  messages: ChatMessageDataType[];
  totalCount: number;
  hasMore: boolean;
}

// Chat Request Types
export interface CreateChatRoomRequest {
  parkingLotUuid: string;
  initialMessage?: string;
}

export interface SendMessageRequest {
  chatRoomUuid: string;
  content: string;
  messageType?: 'TEXT' | 'IMAGE' | 'FILE';
}

// Chat Notification Types
export interface ChatNotificationData {
  chatRoomUuid: string;
  senderName: string;
  messagePreview: string;
  timestamp: string;
}

// Chat Status Types
export type ChatRoomStatus = 'ACTIVE' | 'ARCHIVED' | 'BLOCKED';

export type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
