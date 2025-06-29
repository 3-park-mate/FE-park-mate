import { NotificationDataType } from '@/types/notificationDataTypes';
import { CheckCircle, MessageSquareText } from 'lucide-react';

export default function NotificationItem({
  title,
  content,
  time,
  type,
}: NotificationDataType) {
  const getIconStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      case 'chat':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIconContent = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'info':
        return <span>P</span>;
      case 'chat':
        return <MessageSquareText size={20} />;
      default:
        return null;
    }
  };

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
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getIconStyle()}`}
      >
        {getIconContent()}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-15px">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
        <span className="text-gray-400 text-xs">
          {formatRelativeTime(time)}
        </span>
      </div>
    </div>
  );
}
