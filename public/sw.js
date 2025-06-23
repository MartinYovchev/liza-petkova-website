// Simple service worker to prevent 404 errors
// This can be empty or contain basic caching strategies

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// Optional: Basic fetch handling
self.addEventListener('fetch', (event) => {
  // Let the browser handle all requests normally
  // This prevents any caching interference
  return;
}); 