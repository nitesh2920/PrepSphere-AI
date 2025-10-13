const CACHE_NAME = 'prepsphere-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo-dark.svg',
  '/logo.svg',
  '/favicon.ico'
];

// Check if we're in development mode
const isDevelopment = self.location.hostname === 'localhost' || 
                     self.location.hostname === '127.0.0.1' ||
                     self.location.hostname.includes('vercel.app');

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  if (isDevelopment) {
    console.log('Development mode detected, skipping cache installation');
    self.skipWaiting();
    return;
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('Opened cache');
        // Add URLs one by one to handle failures gracefully
        const cachePromises = urlsToCache.map(async (url) => {
          try {
            // First check if the resource exists
            const response = await fetch(url, { 
              method: 'GET',
              cache: 'no-cache'
            });
            if (response.ok) {
              await cache.put(url, response.clone());
              console.log(`Successfully cached: ${url}`);
            } else {
              console.warn(`Failed to fetch ${url}: ${response.status}`);
            }
          } catch (err) {
            console.warn(`Failed to cache ${url}:`, err);
          }
        });
        
        await Promise.allSettled(cachePromises);
        console.log('Cache installation completed');
      })
      .catch(err => {
        console.error('Cache installation failed:', err);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip caching for development or non-GET requests
  if (isDevelopment || event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch(err => {
          console.warn('Fetch failed:', err);
          // Return a basic offline page or error response if needed
          return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
      .catch(err => {
        console.error('Cache match failed:', err);
        return fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/logo-dark.svg',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open PrepSphere',
        icon: '/logo-dark.svg'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: '/favicon.ico'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PrepSphere AI', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});