console.log("SERVICE WORKER LOADED")

self.addEventListener("push", (event) => {
    const data = event.data.json();
    const options = {
        body: data.body.toString(),
        icon: "/icon192.png",
        badge: "/icon72.png"
    };

    console.log("Service worker: showing notification")

    event.waitUntil(self.registration.showNotification(data.title, options));
})