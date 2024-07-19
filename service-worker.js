self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    event.waitUntil(clients.claim());
    scheduleNotifications();
});

function showNotification() {
    const options = {
        body: 'Nouvelle notification bonus !',
        icon: 'path/to/icon.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
    };

    fetch('http://localhost:8080/assets/data/events.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const currentDate = new Date();
                // Schedule notifications for each event
                data.forEach(event => {
                    const eventDate = new Date(event.date.split('/').reverse().join('-')); // Convert to YYYY-MM-DD format

                    // Calculate the difference in days
                    const timeDifference = eventDate - currentDate;
                    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Use Math.ceil to round up to the nearest day

                    // Check if the event date is today or within one week before
                    if (dayDifference >= -7 && dayDifference <= 0) {
                        let daysRemaining = Math.abs(dayDifference);
                        let message;
                        if (dayDifference === 0) {
                            message = `L'événement ${event.name} commence aujourd'hui !`;
                        }else {
                            message = `L'événement ${event.name} va commencer dans ${daysRemaining} jour(s).`;
                        }

                        const options = {
                            body: message,
                        };

                        self.registration.showNotification(event.name, options);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });


}

// 7 minutes pr l'exemple (presentation) mais 24h ça suffit
function scheduleNotifications() {
    setInterval(function() {
        showNotification();
    }, 7 * 60 * 1000);
}