const CACHE_NAME = 'lucaskaram-v5'; // Bumped version for cache invalidation

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/cnj-lucas-karam.jpg'
];

// Instalação: Força o novo SW a assumir imediatamente (skipWaiting)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Silently fail if some assets fail, keeps core working
      });
    })
  );
});

// Ativação: Limpeza forense de caches antigos (Cache Invalidation)
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
    }).then(() => self.clients.claim()) // Assume controle das abas abertas
  );
});

// Estratégia de Fetch: Stale-while-revalidate (Alta performance com dados sempre frescos)
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam GET (como POST de formulários)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Atualiza o cache silenciosamente em background
        if (event.request.url.startsWith('http') && networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Em caso de offline total, retorna o cache
      });

      // Retorna o cache IMEDIATAMENTE (rápido) enquanto busca na rede (fresco)
      return cachedResponse || fetchPromise;
    })
  );
});
