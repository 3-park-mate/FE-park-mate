'use client';
import { sendTokenToServer } from '@/actions/notification/notification-service';
import { messaging, getToken, onMessage } from '@/utils/firebase';
import { MessagePayload } from 'firebase/messaging';

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
        await sendTokenToServer(currentToken);
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
