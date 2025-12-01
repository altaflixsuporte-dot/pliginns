self.addEventListener("fetch", event => {
  const url = event.request.url;

  // Intercepta mesmo como shouldInterceptRequest
  if (
    url.includes(".mp4") ||
    url.includes(".m3u8") ||
    url.includes("token")
  ) {
    // Envia para a página controlar o player
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(url);
      });
    });
  }

  event.respondWith(fetch(event.request));
});
