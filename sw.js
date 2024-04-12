const staticCacheName = 'pwa-version-' + Date.now();
const filesToCache = [
  '/assets/audio/cardinal.mp3',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon-96x96.png',
  '/assets/icons/favicon-128x128.png',
  '/assets/icons/favicon-196x196.png',
  '/assets/manifest.json',
  '/css/styles.css',
  '/js/main.js',
  '/index.html',
  '/favicon.ico',
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => cache.addAll(filesToCache))
      .finally(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async() => {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter((cacheName) => (
        cacheName.startsWith('pwa-version-') && cacheName !== staticCacheName
      ));
      await Promise.all(oldCaches.map((cacheName) => caches.delete(cacheName)));
      await clients.claim();
      if (oldCaches.length === 0) return;
      const pages = await clients.matchAll();
      pages.forEach((page) => page.postMessage({ type: 'NEW_VERSION_AVAILABLE' }));
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
      .catch((error) => {
        if ('/' === new URL(event.request.url).pathname) {
          return caches.match('/index.html');
        }
        throw error;
      })
  );
});
