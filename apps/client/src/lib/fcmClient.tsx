'use client';
import { sendTokenToServer } from '@/actions/notification/notification-service';
import { messaging, getToken, onMessage } from '@/utils/firebase';
import { MessagePayload } from 'firebase/messaging';
import { toast } from 'sonner';

const FCM_TOKEN_LOCAL_STORAGE_KEY = 'fcm_token';
const MAX_DESCRIPTION_LENGTH = 60;

const formatAndTruncateDescription = (
  text: string | undefined
): React.ReactNode => {
  if (!text) return null;

  let processedText = text;
  let isTruncated = false;

  if (text.length > MAX_DESCRIPTION_LENGTH) {
    processedText = text.substring(0, MAX_DESCRIPTION_LENGTH).trim();
    const lastNewline = processedText.lastIndexOf('\n');
    if (lastNewline !== -1 && lastNewline < MAX_DESCRIPTION_LENGTH - 10) {
      processedText = processedText.substring(0, lastNewline);
    }
    processedText += '...';
    isTruncated = true;
  }

  const lines = processedText.split('\n').filter((line) => line.trim() !== '');

  return (
    <>
      {lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </span>
      ))}
      {isTruncated && !processedText.endsWith('...') && <span>...</span>}
    </>
  );
};

export const initializeFcmClient = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      await requestNotificationPermissionAndGetToken();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.warn('Service Worker is not supported in this browser.');
  }

  if (messaging) {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log('메시지 수신됨. ', payload);
      const notificationTitle: string | undefined = payload.notification?.title;
      const notificationBody: string | undefined = payload.notification?.body;
      const notificationOptions: NotificationOptions = {
        body: payload.notification?.body,
        icon: payload.notification?.icon || '/img/car-thumb.png',
      };
      if (notificationTitle) {
        new Notification(notificationTitle, notificationOptions);
      }

      if (notificationTitle || notificationBody) {
        toast.info(notificationTitle || '새 알림', {
          description: formatAndTruncateDescription(notificationBody),
          duration: 5000,
          // action: {
          //   label: '닫기',
          //   onClick: () => {},
          // },
        });
      }
    });
  }
};

const requestNotificationPermissionAndGetToken = async (): Promise<void> => {
  if (!messaging) {
    console.warn('FCM Messaging을 사용할 수 없습니다.');
    return;
  }

  try {
    const permission: NotificationPermission =
      await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken: string | null = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      });

      if (currentToken) {
        const storedToken = localStorage.getItem(FCM_TOKEN_LOCAL_STORAGE_KEY);

        // 저장된 토큰이 없는 경우에만 서버로 전송
        if (currentToken !== storedToken) {
          console.log('토큰 전송:', currentToken);
          await sendTokenToServer(currentToken);
          localStorage.setItem(FCM_TOKEN_LOCAL_STORAGE_KEY, currentToken); // 새로운 토큰을 저장
        }
      } else {
        localStorage.removeItem(FCM_TOKEN_LOCAL_STORAGE_KEY);
      }
    } else {
      console.log('알림 권한을 얻을 수 없습니다.');
      localStorage.removeItem(FCM_TOKEN_LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    console.error('토큰 검색 중 오류 발생: ', err);
    localStorage.removeItem(FCM_TOKEN_LOCAL_STORAGE_KEY);
  }
};
