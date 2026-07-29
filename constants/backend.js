/**
 * =========================================================================
 * RAVINDRAAI — BACKEND CONNECTION POINT
 * =========================================================================
 * This file is the ONLY place you need to touch to connect real services.
 * Everything in the app currently calls the "DEMO" functions below, which
 * just show a toast message instead of doing anything real.
 *
 * WHEN YOU'RE READY TO CONNECT FIREBASE:
 * 1. Create a project at https://console.firebase.google.com
 * 2. Install the Firebase SDK:  npx expo install firebase
 * 3. Paste your config into FIREBASE_CONFIG below
 * 4. Replace each DEMO function's body with real Firebase calls
 *    (Auth, Firestore, etc.) — the function names/signatures can stay
 *    the same so you don't have to change any screen code.
 *
 * WHEN YOU'RE READY TO CONNECT YOUR AI PROVIDER (OpenAI/Gemini/Claude/etc):
 * 1. Get an API key from your chosen provider
 * 2. Paste it into AI_PROVIDER_CONFIG below (or better: call it from a
 *    backend server, not directly from the app, so the key stays secret)
 * 3. Replace sendMessageToAI() with a real fetch() call to that provider
 *
 * IMPORTANT: Never put a real API key directly in this file if the app
 * will be public — keys embedded in an app can be extracted by anyone.
 * The safe pattern is: app -> your own small server -> AI provider.
 * The "API Keys" screen in Settings is a placeholder for wiring this up;
 * it does not store keys securely on its own yet.
 * =========================================================================
 */

export const FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID",
};

export const AI_PROVIDER_CONFIG = {
  provider: "not_connected", // e.g. "openai" | "gemini" | "anthropic" | "custom"
  apiKey: "",
  // The label shown to end users never changes, regardless of provider:
  displayName: "Ravindra AI",
};

// ---- DEMO STUBS (replace internals once Firebase is connected) ----

export async function signInWithGoogle() {
  return { demo: true, message: "Sign-in will work once Firebase Auth is connected." };
}

export async function signOut() {
  return { demo: true, message: "Logged out (demo)" };
}

export async function saveProfile(profileData) {
  console.log("DEMO saveProfile called with:", profileData);
  return { demo: true, message: "Profile saved (demo)" };
}

export async function sendMessageToAI(conversationHistory, newMessage) {
  // Replace this with a real call to your backend/AI provider.
  // The user should NEVER see which underlying model answered —
  // always present replies as coming from "Ravindra AI".
  console.log("DEMO sendMessageToAI called with:", newMessage);
  return {
    demo: true,
    reply: "This is a demo reply. Connect an AI provider in constants/backend.js to get real responses.",
  };
}

export async function checkUsageLimit(userId) {
  // Replace with a real Firestore read of the user's message count.
  // Return { limitReached: true } once the free quota is used up so the
  // "Get Plus" badge appears — it stays hidden otherwise.
  return { demo: true, limitReached: false };
}
