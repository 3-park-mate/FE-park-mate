export interface NotificationItemDataType {
  notificationId: string;
  title: string;
  content: string;
  sendAt: string;
  status: 'SENT' | 'READ';
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
