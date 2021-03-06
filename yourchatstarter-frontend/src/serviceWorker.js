// export default function LocalServiceWorkerRegister() {
//     const swPath = `${process.env.PUBLIC_URL}/serviceWorker.js`;
//     if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
//       window.addEventListener('load', function() {
//         navigator.serviceWorker.register(swPath).then(function(registration) {
//           // Registration was successful
//           console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//           // registration failed :(
//           console.log('ServiceWorker registration failed: ', err);
//         });
//       });
//     }
// }

// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  console.log('attempt registering service worker')
  if (process.env.NODE_ENV !== 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    console.log('public url', process.env.PUBLIC_URL)
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      console.log("window loading, will try to register a service worker")

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        console.log("is localhost, will check for existing service worker at: ", swUrl)
        checkValidServiceWorker(swUrl, config);
        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        console.log('not localhost, trying to register new notification subscriber')
        registerValidSW(swUrl, config);
      }
    });
  }
  else if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    console.log('public url', process.env.PUBLIC_URL)
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      console.log('invalid public url, aborting')
      return;
    }
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    if (document.readyState === "complete") {
      console.log("window loaded, trying to register a service worker at", swUrl)
      console.log('trying to register new notification subscriber')
      registerValidSW(swUrl, config);
    }
    else {
      window.addEventListener('load', () => {
        console.log("window loading, will try to register a service worker at", swUrl)
        console.log('trying to register new notification subscriber')
        registerValidSW(swUrl, config);
      })
    }
  }
}

function registerValidSW(swUrl, config) {
  console.log(swUrl)
  navigator.serviceWorker
    .register(swUrl, {scope: '/'})
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://cra.link/PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const pushServerPublicKey = 'BKCgepgxlhniRpbB7E1AjqRlet413-ac-6nJxTu9Wh_7Kw_hjuASZHaoe5qrhZiPbTmm7DKznbZg5P7D1rCHyt8';

export async function askUserPermission() {
  return await Notification.requestPermission();
}

export async function createNotificationSubscription() {
  //wait for service worker installation to be ready

  const serviceWorker = await navigator.serviceWorker.ready;

  // subscribe and return the subscription

  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(pushServerPublicKey)
  });
}

export function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
}

export function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}