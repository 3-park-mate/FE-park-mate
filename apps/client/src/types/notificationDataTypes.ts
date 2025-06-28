export interface NotificationDataType {
  id: string;
  title: string;
  content: string;
  time: string;
  type: 'success' | 'info' | 'chat';
  icon?: string;
}
