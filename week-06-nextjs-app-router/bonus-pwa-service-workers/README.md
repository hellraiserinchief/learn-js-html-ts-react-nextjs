# Bonus — PWAs and Service Workers

**Why now:** "Installable, works offline, push notifications" used to mean writing a native app. Today it's a `manifest.json` and a service worker. Worth knowing for: offline-tolerant tools, anything embedded in a kiosk, and bringing app-like UX to mobile web.

**Reading (90 min):** [web.dev — Learn PWA](https://web.dev/learn/pwa), [MDN — Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), [Workbox docs](https://developer.chrome.com/docs/workbox).

## What makes a PWA

1. **Web App Manifest** (`manifest.webmanifest`) — name, icons, theme color, display mode (`standalone` makes it look app-like).
2. **Service Worker** — a JS file the browser runs in the background; intercepts network requests, can cache, can serve offline, can wake up to handle push notifications.
3. **HTTPS** — required (except `localhost`).

## The service worker mental model

A service worker is a **proxy you write in JS** that sits between your app and the network. Lifecycle:

- `install` — cache the shell of your app.
- `activate` — clean up old caches.
- `fetch` — intercept every request; decide cache-first / network-first / stale-while-revalidate.

The first load registers it; the *second* load is when it actually runs. This 2nd-load delay is the #1 footgun.

## Don't write it from scratch — use Workbox

```bash
pnpm add -D workbox-build
# or in Next: pnpm add @ducanh2912/next-pwa
```

Workbox provides battle-tested caching strategies. Most production PWAs use:

- `CacheFirst` for fonts, images, immutable assets.
- `NetworkFirst` for HTML pages.
- `StaleWhileRevalidate` for CSS/JS bundles.

## Next.js setup (with `@ducanh2912/next-pwa`)

```ts
// next.config.ts
import withPWA from '@ducanh2912/next-pwa';

export default withPWA({
  dest: 'public',
  register: true,
  workboxOptions: { disableDevLogs: true },
})({
  // your normal Next config
});
```

```json
// public/manifest.webmanifest
{
  "name": "My App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#635bff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

```html
<!-- in app/layout.tsx <head> -->
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#635bff" />
```

## Push notifications

Two halves:

1. **Permission + subscription** in the browser — `Notification.requestPermission()`, then `serviceWorker.pushManager.subscribe(...)`.
2. **Send** from your backend with VAPID keys (e.g. via `web-push` on Node) to the subscription endpoint.

Don't ask for notification permission on page load. The user will deny and you'll never recover. Ask in response to a clear action ("Notify me when this is ready").

## Exercise

Convert your Week 6 blog into an installable PWA:

1. Add manifest + icons.
2. Wire `next-pwa`. `pnpm build && pnpm start`, then in Chrome DevTools → Application → Manifest, install it.
3. Open the app, kill your wifi, refresh — confirm cached shell loads.
4. Add a `/offline` page that's served when both cache and network fail.

## Skip if

You're building an internal SaaS that lives in a tab, behind a login. PWA-ness adds little there. PWA wins when "open this thing fast, even on bad wifi" matters.
