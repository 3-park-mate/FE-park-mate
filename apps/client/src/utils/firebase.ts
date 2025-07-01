import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
  MessagePayload,
} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export let messaging: Messaging | undefined;

if (
  typeof window !== 'undefined' &&
  typeof window.self.ServiceWorkerRegistration !== 'undefined'
) {
  messaging = getMessaging(app);
}

export const requestForToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.warn('FCM Messaging not available.');
    return null;
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
        return currentToken;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        return null;
      }
    } else {
      console.log('Unable to get permission to notify.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    return null;
  }
};

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload: MessagePayload) => {
        console.log('Message received. ', payload);
        resolve(payload);
        const notificationTitle: string | undefined =
          payload.notification?.title;
        const notificationOptions: NotificationOptions = {
          body: payload.notification?.body,
        };
        if (notificationTitle) {
          new Notification(notificationTitle, notificationOptions);
        }
      });
    }
  });

export { getToken, onMessage };
