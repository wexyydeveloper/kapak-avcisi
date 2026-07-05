// Kapak Avcısı — Service Worker
// Sadece uygulama kabuğunu (HTML/CSS/JS/ikonlar) önbelleğe alır.
// Kapak fotoğrafları her zaman ağdan taze çekilir (i.ytimg.com), önbelleklenmez.

const CACHE_NAME = 'kapak-avcisi-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // i.ytimg.com kapak görsellerine hiç dokunma, doğrudan ağdan çeksin.
  if (url.hostname.includes('ytimg.com')) return;

  // Sadece kendi kabuk dosyalarımız için önbellek-öncelikli strateji.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
