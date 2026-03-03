const CACHE_NAME = 'eflash-v2';
const urlsToCache = [
  '/Eflash-1/',
  '/Eflash-1/index.html',
  '/Eflash-1/assets/images/logo.png',
  '/Eflash-1/assets/css/style.css',
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
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Fetch event - Network first for HTML, cache first for assets
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

  // Network-first strategy for HTML to ensure fresh content
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match('/Eflash-1/index.html');
          });
        })
    );
    return;
  }

  // Cache-first strategy for assets
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
      // Return offline page if available
      return caches.match('/Eflash-1/index.html');
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
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});