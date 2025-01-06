// Initialize the map and set its view to the user's current location
navigator.geolocation.getCurrentPosition(
    function(position) {
        const { latitude, longitude } = position.coords;
        const map = L.map('map').setView([latitude, longitude], 13);

        // Load and display the tile layer (map tiles)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Add a marker at the user's current location
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup('You are here.')
            .openPopup();

        // Handling click event on the map to add a marker
        map.on('click', function(e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`)
                .openPopup();
        });
    },
    function() {
        alert('Could not get your location');
    }
);