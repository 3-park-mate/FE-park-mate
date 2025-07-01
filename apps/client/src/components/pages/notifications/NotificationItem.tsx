import { readNotificationAction } from '@/actions/notification/notification-service';
import { NotificationType } from '@/types/notificationDataTypes';
import {
  AlertCircle,
  CalendarCheck,
  CalendarX,
  CheckCircle,
  MessageSquareText,
} from 'lucide-react';
import { useEffect } from 'react';

export default function NotificationItem({
  title,
  notificationId,
  content,
  sendAt,
  status,
  type,
}: {
  title: string;
  notificationId: string;
  content: string;
  sendAt: string;
  status: 'SENT' | 'READ';
  type: NotificationType;
}) {
  const getIconStyle = () => {
    switch (type) {
      case 'USER_PARKING_ENTRY':
        return 'bg-green-500 text-white';
      case 'RESERVATION_CREATED':
        return 'bg-blue-500 text-white';
      case 'RESERVATION_MODIFIED':
        return 'bg-yellow-500 text-white';
      case 'RESERVATION_CANCELED':
        return 'bg-red-500 text-white';
      case 'EMPTY_SPOT_AVAILABLE':
        return 'bg-cyan-600 text-white';
      case 'PARKING_EXIT_REMINDER':
        return 'bg-orange-500 text-white';
      case 'CHAT_MESSAGE':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIconContent = () => {
    switch (type) {
      case 'USER_PARKING_ENTRY':
        return <CheckCircle size={20} />;
      case 'RESERVATION_CREATED':
        return <span>P</span>;
      case 'RESERVATION_MODIFIED':
        return <CalendarCheck size={20} />;
      case 'RESERVATION_CANCELED':
        return <CalendarX size={20} />;
      case 'EMPTY_SPOT_AVAILABLE':
        return <span>P</span>;
      case 'PARKING_EXIT_REMINDER':
        return <AlertCircle size={20} />;
      case 'CHAT_MESSAGE':
        return <MessageSquareText size={20} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (status != 'READ') {
      readNotificationAction(notificationId)
        .then(() => {
          console.log(`알림 ${notificationId} 읽음 처리 완료.`);
        })
        .catch((error) => {
          console.error(`알림 ${notificationId} 읽음 처리 실패:`, error);
        });
    }
  }, [notificationId, status]);

  const formatRelativeTime = (isoTime: string) => {
    const timeDiff = Date.now() - new Date(isoTime).getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <div className="relative flex items-start gap-3 p-4 rounded-lg bg-white">
      {status !== 'READ' && (
        <span className="absolute top-4 right-4 w-2 h-2 bg-red-2 rounded-full" />
      )}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getIconStyle()}`}
      >
        {getIconContent()}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-15px">{title}</h3>
        <p className="text-gray-600 text-sm whitespace-pre-line">{content}</p>
        <span className="text-gray-400 text-xs">
          {formatRelativeTime(sendAt)}
        </span>
      </div>
    </div>
  );
}
