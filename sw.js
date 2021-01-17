// Cache servive worker

const notesCache = 'notes-cache';

// Create or open cache storage and cache files 
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(notesCache).then(cache => {
            console.log('Caching files...')
            return cache.addAll([
                '/index.html',
                '/index.js',
                '/style.css'
            ]);
            
        })
        .then(() => console.log('Files cached.')),   
    );
});

// Intercept network fetch request and return cached files if match
self.addEventListener('fetch', e => {
    console.log('Requested url: ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => {
            if(response) {
                console.log('Response served from service worker cache:');
                console.log(response);
                return response;
            } else {
                console.log('Requested fetched from network:');
                console.log(e.request);
                return fetch(e.request);
            }
            //return response || fetch(e.request);
        })
    );
});