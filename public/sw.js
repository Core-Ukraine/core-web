// Shows a page of the site instead of a browser error when a page cannot load
const CACHE = "offline-v1";
const PAGE = "/offline";
const DAY = 24 * 60 * 60 * 1000;

// Keeps the offline page, refreshed at most once a day
const remember = async () => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(PAGE);
  if (cached && Date.now() - Date.parse(cached.headers.get("date") ?? "") < DAY) return;
  await cache.add(PAGE);
};

// The kept offline page, or the error of the browser without one
const fallback = async () => (await caches.match(PAGE, { cacheName: CACHE })) ?? Response.error();

// Takes over right away instead of waiting for every tab to close
self.addEventListener("install", () => self.skipWaiting());

// Drops older caches, starts page loads early and keeps the offline page
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      const old = names.filter((name) => name.startsWith("offline-") && name !== CACHE);
      await Promise.all(old.map((name) => caches.delete(name)));
      await self.registration.navigationPreload?.enable();
      await self.clients.claim();
      await remember().catch(() => {});
    })(),
  );
});

// Loads pages from the network, and the offline page without one
self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    (async () => {
      try {
        const response = (await event.preloadResponse) ?? (await fetch(event.request));
        event.waitUntil(remember().catch(() => {}));
        return response;
      } catch {
        return fallback();
      }
    })(),
  );
});
