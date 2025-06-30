import { messaging, getToken, onMessage } from '@/utils/firebase';
import { MessagePayload } from 'firebase/messaging';

const sendTokenToServer = async (token: string): Promise<void> => {
  try {
    const response = await fetch('/api/save-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token sent to server:', data);
    } else {
      const errorData = await response.json();
      console.error('Failed to send token to server:', errorData);
    }
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};

export const initializeFcmClient = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js'
      );
      //   console.log('Service Worker registered successfully:', registration);
      await requestNotificationPermissionAndGetToken();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.warn('Service Worker is not supported in this browser.');
  }

  // Foreground message handler
  if (messaging) {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log('Message received. ', payload);
      const notificationTitle: string | undefined = payload.notification?.title;
      const notificationOptions: NotificationOptions = {
        body: payload.notification?.body,
        icon: payload.notification?.icon || '/firebase-logo.png',
      };
      if (notificationTitle) {
        new Notification(notificationTitle, notificationOptions);
      }
    });
  }
};

const requestNotificationPermissionAndGetToken = async (): Promise<void> => {
  if (!messaging) {
    console.warn('FCM Messaging not available.');
    return;
  }

  try {
    const permission: NotificationPermission =
      await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken: string | null = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      });
      if (currentToken) {
        console.log('FCM Registration Token:', currentToken);
        // await sendTokenToServer(currentToken);
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
};
