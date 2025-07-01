importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAVqbgaFp37hTa78OtZLuojlme6Xwrn98o',
  authDomain: 'parkmate-bc438.firebaseapp.com',
  projectId: 'parkmate-bc438',
  storageBucket: 'parkmate-bc438.firebasestorage.app',
  messagingSenderId: '602895129832',
  appId: '1:602895129832:web:36b225f2a16a3d37d23d5d',
  measurementId: 'G-J0273R7GP3',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 핸들러
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/img/car-thumb.png',
  };

  if (notificationTitle) {
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
