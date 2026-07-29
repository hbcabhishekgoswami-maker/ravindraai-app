# Ravindra AI — App Source Code

Ye poora app ka source code hai. Neeche di gayi steps follow karke aap
GitHub + CodeMagic se apna APK bana sakte hain — computer ki zaroorat
nahi, sab mobile browser se ho sakta hai.

## Step 1 — GitHub par upload karo

1. https://github.com par free account banao (agar nahi hai)
2. "New repository" banao — naam do: `ravindraai-app`
3. Is poori folder (sab files/folders) ko us repository me upload karo
   - GitHub website par "Add file" → "Upload files" se seedha upload kar sakte ho
   - Sabse aasan: is poore folder ka ZIP GitHub Desktop ya web upload se daal do

## Step 2 — Firebase connect karna (jab ready ho)

1. https://console.firebase.google.com par free project banao
2. Apna app add karo (Android)
3. Jo config keys milengi, unhe `constants/backend.js` file ke andar
   `FIREBASE_CONFIG` wale object me paste karo
4. Us file ke upar likhe comments follow karke Auth/Firestore connect karo

## Step 3 — AI Provider (OpenAI/Gemini/Claude/etc.) connect karna

1. Apne chosen provider se API key lo
2. `constants/backend.js` me `AI_PROVIDER_CONFIG` me daalo
3. `sendMessageToAI()` function ke andar real API call likho
   (safest: apna khud ka chhota backend server banao jo key ko chhupaye,
   app ke andar seedhe key mat rakho agar app public karna hai)

**Important**: Users ko hamesha sirf "Ravindra AI" naam dikhna chahiye —
kabhi bhi backend model/provider ka naam UI me mat likhna.

## Step 4 — CodeMagic se APK banana

1. https://codemagic.io par free account banao
2. Apna GitHub repository connect karo
3. CodeMagic khud detect kar lega ki ye Expo/React Native project hai
4. "Android" build choose karo, "Build" dabao
5. Build complete hone ke baad, wahi se APK download kar sakte ho
6. APK ko phone me install karo (Settings me "unknown sources" allow karna padega)

## Project structure

```
app/              — har screen ek file (index=splash, login, home, sidebar, etc.)
components/       — reusable UI pieces (PulseMark logo, Toast, Wordmark)
constants/theme.js    — colors, fonts, spacing — design system
constants/backend.js  — SINGLE FILE jahaan Firebase/API connect hoga
assets/images/    — app icon aur logo image
```

## Abhi kya kaam karta hai, kya nahi

- Sab screens aur buttons UI-wise fully kaam karte hain (navigation, taps)
- Chat, login, save profile — abhi "demo" hain (ek chhota confirmation
  message dikhata hai) kyunki koi backend connected nahi hai
- "Get Plus" badge sirf tab dikhega jab `checkUsageLimit()` limit reached
  bataye — abhi wo hamesha `false` return karta hai, ek dev-only toggle
  home screen par diya hai testing ke liye (isse asli app me hata dena)
- Sab kuch `constants/backend.js` se control hota hai — ek file, sab jagah
