'use client';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import NotificationItem from './NotificationItem';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { NotificationItemDataType } from '@/types/notificationDataTypes';
import { getNotificationsData } from '@/actions/notification/notification-service';
import { PAGE_SIZE } from '@/constants/constants';
import NotificationItemSkeleton from './NotificationItemSkeleton';

export default function NotificationList() {
  const {
    items: notifications,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<NotificationItemDataType, number>({
    fetchData: async (cursor) => {
      const res = await getNotificationsData({
        size: PAGE_SIZE,
        cursor,
      });
      if (res.success) {
        return {
          content: res.data.content,
          nextCursor: res.data.nextCursor,
          hasNext: res.data.hasNext,
        };
      }
      throw new Error('Failed to fetch');
    },
    filterDuplicateItems: (existing, newItems) => {
      const existingCodes = new Set(
        existing.map((item) => item.notificationId)
      );
      return newItems.filter((item) => !existingCodes.has(item.notificationId));
    },
  });

  if (isLoading && notifications.length === 0) {
    return (
      <PaddedSection className="py-4 space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <NotificationItemSkeleton />
          </div>
        ))}
      </PaddedSection>
    );
  }

  return (
    <PaddedSection className="py-4 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.notificationId}
          notificationId={notification.notificationId}
          title={notification.title}
          content={notification.content}
          sendAt={notification.sendAt}
          status={notification.status}
          type={notification.type}
        />
      ))}
      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <NotificationItemSkeleton />}
      </div>
      {notifications.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500">새로운 알림이 없습니다.</p>
      )}
    </PaddedSection>
  );
}
