const staticCacheName = `pwa-version-${new Date().getTime()}`;
const filesToCache = [
  "/assets/audio/cardinal.mp3",
  "/assets/icons/favicon-16x16.png",
  "/assets/icons/favicon-32x32.png",
  "/assets/icons/favicon-96x96.png",
  "/assets/icons/favicon-128x128.png",
  "/assets/icons/favicon-196x196.png",
  "/css/styles.css",
  "/js/main.js",
  "/index.html",
];

// Cache on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => cache.addAll(filesToCache))
      .then(() => self.skipWaiting())
  );
});

// Clear cache on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => (
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith('pwa-version-'))
            .filter((cacheName) => cacheName !== staticCacheName)
            .map((cacheName) => caches.delete(cacheName))
        )
      ))
      .then(() => self.clients.claim())
  );
});

// Serve from Cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/index.html'))
  );
});

// Sync
self.addEventListener('sync', console.log);

// Push notifications
self.addEventListener('push', console.log);