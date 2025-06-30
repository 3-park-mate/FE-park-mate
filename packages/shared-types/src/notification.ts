import { BaseFormData } from './common';

// Notification Types
export interface NotificationDataType extends BaseFormData {
  notificationUuid: string;
  userUuid: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  relatedId?: string;
  imageUrl?: string;
}

export type NotificationType =
  | 'RESERVATION_CONFIRMED'
  | 'RESERVATION_CANCELLED'
  | 'RESERVATION_REMINDER'
  | 'PAYMENT_COMPLETED'
  | 'PAYMENT_FAILED'
  | 'CHAT_MESSAGE'
  | 'REVIEW_RECEIVED'
  | 'SYSTEM_ANNOUNCEMENT'
  | 'PROMOTION';

// Notification Request Types
export interface CreateNotificationRequest {
  userUuid: string;
  title: string;
  content: string;
  type: NotificationType;
  relatedId?: string;
  imageUrl?: string;
}

// Notification Response Types
export interface NotificationListResponse {
  notifications: NotificationDataType[];
  totalCount: number;
  unreadCount: number;
}

// Notification Settings Types
export interface NotificationSettingsDataType {
  userUuid: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  reservationNotifications: boolean;
  paymentNotifications: boolean;
  chatNotifications: boolean;
  marketingNotifications: boolean;
}

// Notification Filter Types
export interface NotificationFilterParams {
  type?: NotificationType;
  isRead?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}
