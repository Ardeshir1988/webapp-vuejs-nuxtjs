if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const worker of registrations) {
      console.log('Service worker:', worker)
    }
  });
}

const version = '1.1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) =>
        cache.addAll([
          '/'
        ]),
      ),
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) =>
        cache.addAll([
          new Request('/styles.css', { cache: 'no-cache' }),
          new Request('/script.js', { cache: 'no-cache' }),
        ]),
      ),
  );
});
