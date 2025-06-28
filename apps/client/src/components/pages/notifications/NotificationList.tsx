import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import NotificationItem from './NotificationItem';
import { mockNotifications } from '@/data/notificationDummyDatas';

export default function NotificationList() {
  return (
    <PaddedSection className="py-4 space-y-2">
      {mockNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          title={notification.title}
          content={notification.content}
          time={notification.time}
          type={notification.type}
        />
      ))}
    </PaddedSection>
  );
}
