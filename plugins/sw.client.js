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
          '/',
          '/script-f93bca2c.js',
          '/styles-a837cb1e.css',
          '/cats-0e9a2ef4.jpg',
        ]),
      ),
  );
});
