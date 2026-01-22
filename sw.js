const cachename = 'do-it-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/assets/logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cachename)
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
                return response || fetch(event.request);
            }
        )
    );
}
);
// self.addEventListener('activate', event => {
//     const cacheWhitelist = [cachename];
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if (!cacheWhitelist.includes(cacheName)) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         }
//         )
//     );
// }
// );