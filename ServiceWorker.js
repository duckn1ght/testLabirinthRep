const cacheName = "SensorTech-SensorGame_Lab-1.0.0";
const contentToCache = [
    "Build/1dbc585c09dae72b0750f20bc4231305.loader.js",
    "Build/d0cc43a59fba99cf9ed837fd4cc981a7.framework.js.br",
    "Build/358e45aeea7e0b2220d062dd5c58e9f5.data.br",
    "Build/581b570580d89a24a377783bf6cd27e0.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
