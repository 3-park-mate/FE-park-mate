export type NotificationType =
  | 'CHAT_MESSAGE'
  | 'EMPTY_SPOT_AVAILABLE'
  | 'RESERVATION_CREATED'
  | 'RESERVATION_MODIFIED'
  | 'RESERVATION_CANCELED'
  | 'USER_PARKING_ENTRY'
  | 'PARKING_EXIT_REMINDER';

export interface NotificationItemDataType {
  notificationId: string;
  title: string;
  content: string;
  sendAt: string;
  status: 'SENT' | 'READ';
  type: NotificationType;
}

export interface NotificationResponse {
  content: NotificationItemDataType[];
  hasNext: boolean;
  nextCursor: number;
}

export interface NotificationDataType {
  id: string;
  title: string;
  content: string;
  time: string;
  type: 'success' | 'info' | 'chat';
  icon?: string;
}
