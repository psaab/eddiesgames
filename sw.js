// Arcade Blitz service worker: lets the games load offline and makes the site installable.
const CACHE = "arcade-blitz-be8e3cb2e8";
const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/favicon-32.png",
  "/games/blitz-arena.html",
  "/games/cliff-dive.html",
  "/games/air-hockey.html",
  "/games/tennis.html",
  "/games/bubble-shooter.html",
  "/games/hippo-sled.html"
];
const CDN = "cdnjs.cloudflare.com";

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin) {
    // Our own files: try the network first so updates show up, fall back to the cache when offline
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
          return response;
        })
        .catch(() => caches.match(request).then(hit => hit || caches.match("/index.html")))
    );
  } else if (url.hostname === CDN) {
    // The 3D library: cache it after the first download
    event.respondWith(
      caches.match(request).then(hit => hit || fetch(request).then(response => {
        const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); return response;
      }))
    );
  }
});
