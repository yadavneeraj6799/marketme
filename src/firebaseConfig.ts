/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Firebase Client Configuration Placeholder
 * 
 * To connect to Firebase:
 * 1. Create a project in the Firebase Console (https://console.firebase.google.com).
 * 2. Add your Web App configuration keys to your environment variables (.env):
 *    VITE_FIREBASE_API_KEY
 *    VITE_FIREBASE_AUTH_DOMAIN
 *    VITE_FIREBASE_PROJECT_ID
 *    VITE_FIREBASE_STORAGE_BUCKET
 *    VITE_FIREBASE_MESSAGING_SENDER_ID
 *    VITE_FIREBASE_APP_ID
 * 
 * Note: The application does NOT require these credentials to preview and run.
 * All leads are safely preserved in the client lead store (localStorage) and
 * immediately accessible for export and WhatsApp continuation.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);
