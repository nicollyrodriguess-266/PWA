if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("sw.js")
      .then((registration) => {

        console.log("SW registrado:", registration);

      })
      .catch((error) => {

        console.log("Erro:", error);

      });

  });

}

const CACHE_NAME = "cadastro-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/css/index.css",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then((cache) => {

        return cache.addAll(urlsToCache);

      })

  );

});

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)
      .then((response) => {

        return response || fetch(event.request);

      })

  );

});