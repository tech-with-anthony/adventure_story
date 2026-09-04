const STATIC_CACHE = 'adventure-stories-v7';
const DYNAMIC_CACHE = 'adventure-stories-dynamic-v1';

const STATIC_ASSETS = [
  '/adventure.html',
  '/engine.js',
  '/audio.js',
  '/catalog.js',
  '/catalog.json',
  '/stories/valdrath.js',
  '/stories/fae_court.js',
  '/stories/pale_signal.js',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // catalog.json — network-first, cache fallback
  if (url.endsWith('catalog.json')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(DYNAMIC_CACHE).then(c => c.put(e.request, clone));
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Remote story scripts — cache-first, fetch+cache on miss
  if (url.includes('/stories/') && url.endsWith('.js')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(r => {
          const clone = r.clone();
          caches.open(DYNAMIC_CACHE).then(c => c.put(e.request, clone));
          return r;
        });
      })
    );
    return;
  }

  // Everything else — cache-first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
