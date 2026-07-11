console.log("SERVICE WORKER LOADED")

self.addEventListener("push", (event) => {
    let data;

    try {
        data = event.data ? event.data.json() : {}
    } catch (error) {
        console.error("Failed to parse event data", error)
    }

    const title = data.title || "New Notification"

    const options = {
        body: data.body.toString(),
        // icon: "/icon192.png",
        // badge: "/icon72.png"
    };

    console.log("Service worker: showing notification")

    event.waitUntil(self.registration.showNotification(title, options));
})

self.addEventListener("error", e => {
  console.error("SW ERROR", e);
});

self.addEventListener("unhandledrejection", e => {
  console.error("SW PROMISE ERROR", e);
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});