import { MiniReact, MiniReactDom } from "./core/MiniReact.js";
import routes from "./routes.js";

MiniReactDom.render(document.getElementById("root"), routes);

Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(err) {
            console.error('Service Worker registration failed:', err);
        });
}

