// Heavy Match Service Worker — PWA Offline Support
const CACHE_NAME = "heavy-match-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE = ["/", "/demo", "/login", "/register", "/icon.svg", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match(OFFLINE_URL)))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
        if (res.status === 200 && e.request.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => new Response("Offline", { status: 503 })))
    );
  }
});
