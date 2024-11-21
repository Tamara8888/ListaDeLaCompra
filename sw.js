const CACHE_NAME = 'v1.0.2'; // Versión APP

const URLsToCache = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './icon.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll(URLsToCache);
        })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
    
    // Limpiar cachés antiguas
    const cacheWhitelist = [CACHE_NAME]; // Solo mantener la versión actual
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Borrar cachés antiguas
                    }
                })
            );
        })
    );
});

// Manejo de las peticiones (Fetch)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
