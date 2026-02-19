const CACHE_NAME = 'eflash-v1';
const urlsToCache = [
  '/E-Flash-1.2/',
  '/E-Flash-1.2/index.html',
  '/E-Flash-1.2/assets/images/logo.png',
  '/E-Flash-1.2/assets/css/style.css',
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {
        console.log('Cache addAll failed, continuing anyway');
      });
    })
  );
  self.skipWaiting();
});

// Fetch event - Cache first strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  // Skip unsupported schemes such as chrome-extension://, data:, etc.
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        // Don't cache if not a success response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache).catch(() => {
            // Ignore cache write failures for unsupported/opaque requests.
          });
        });
        return response;
      });
    }).catch(() => {
      // Return a offline page if available
      return caches.match('/E-Flash-1.2/index.html');
    })
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});