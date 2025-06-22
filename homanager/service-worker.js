self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('meu-cache-v1').then(cache =>
			cache.addAll([
				'/',
				'/index.html',
				'/styles.css',
				'/main.js',
				'/favicon/favicon.ico',
				'/favicon/favicon.svg',
				'/favicon/favicon-96x96.png',
				'/favicon/web-app-manifest-192x192.png',
				'/favicon/web-app-manifest-512x512.png',
				'/favicon/apple-touch-icon.png',
			])
		)
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response =>
		response || fetch(event.request)
		)
	);
});