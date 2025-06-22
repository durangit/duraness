importScripts('polyfill.js');

const CACHE_VERSION = "0.0.01";
const CACHE_NAME = `static-homanager-${CACHE_VERSION}`;

const DATA_CACHE_VERSION = "0.0.01";
const DATA_CACHE_NAME = `data-homanager-${CACHE_VERSION}`;

const CACHE_FILES = [
	'/homanager/index.html',
	'/homanager/styles.css',
	'/homanager/main.js',
	'/homanager/favicon/favicon.ico',
	'/homanager/favicon/favicon.svg',
	'/homanager/favicon/favicon-96x96.png',
	'/homanager/favicon/web-app-manifest-192x192.png',
	'/homanager/favicon/web-app-manifest-512x512.png',
	'/homanager/favicon/apple-touch-icon.png',
];

self.addEventListener('install', event => {
	console.log('[ServiceWorker] Install');

	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			console.log('[ServiceWorker] Pre-caching offline page');
			return cache.addAll(CACHE_FILES);
		})
	);

	self.skipWaiting();
});

self.addEventListener('activate', event => {	
	console.log('[ServiceWorker] Activate');

	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
				if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);

	self.clients.claim();
});

self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] Fetch', event.request.url);

	if (event.request.url.includes('/forecast/')) {
		console.log('[Service Worker] Fetch (data)', event.request.url);
		event.respondWith(
			caches.open(DATA_CACHE_NAME).then((cache) => {
				return fetch(event.request).then((response) => {
					// If the response was good, clone it and store it in the cache.
					if (response.status === 200) {
						cache.put(event.request.url, response.clone());
					}
					return response;
				}).catch((err) => {
					// Network request failed, try to get it from the cache.
					return cache.match(event.request);
				});
			}));
		return;
	}

	event.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request);
			})
		})
	);
});