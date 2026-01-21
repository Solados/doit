const cashname = 'do it';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cashname)
            .then(cache => {
                return cache.addAll(urlsToCache);
            }
        )
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
}
);
self.addEventListener('activate', event => {
    const cacheWhitelist = [cashname];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }
        )
    );
}
);