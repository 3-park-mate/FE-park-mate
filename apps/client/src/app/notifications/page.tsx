import PageHeader from '@/components/layouts/PageHeader';
import NotificationList from '@/components/pages/notifications/NotificationList';

export default function page() {
  return (
    <div className="bg-gray-light-1 min-h-screen">
      <PageHeader title="알림" />
      <main className="pb-8">
        <NotificationList />
      </main>
    </div>
  );
}
