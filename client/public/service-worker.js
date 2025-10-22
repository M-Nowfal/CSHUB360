const CACHE_NAME = "cshub360-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Install event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// Fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(async () => {
      return caches.match(e.request).then((res) => {
        return res || caches.match("/offline.html");
      });
    })
  );
});
