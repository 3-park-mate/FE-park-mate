// store/notificationStore.ts
import { create } from 'zustand';
import { getUnreadNotificationCount } from '@/actions/notification/notification-service';

interface NotificationState {
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  fetchUnreadCount: () => Promise<void>;
  setUnreadCount: (count: number) => void;
  onNotificationReceived: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchUnreadCount: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getUnreadNotificationCount();
      if (res.success && res.data !== undefined) {
        set({ unreadCount: res.data, isLoading: false });
      } else {
        // 내부에서 redirect /error 발생
      }
    } catch (err) {
      console.error('Failed to fetch unread notification count:', err);
      set({
        error:
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
        isLoading: false,
      });
    }
  },

  setUnreadCount: (count) => set({ unreadCount: count }),

  onNotificationReceived: () => {
    // 알림이 수신되었을 때 알림 개수를 다시 페칭하도록 트리거
    console.log('알림 수신 신호 감지, 알림 개수 갱신 시작');
    get().fetchUnreadCount();
  },
}));
