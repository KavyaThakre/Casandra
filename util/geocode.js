// Free geocoding via Photon (by Komoot) — built on OpenStreetMap data,
// no API key required. Switched from Nominatim, which has started
// blocking many automated/non-browser requests even with a valid
// User-Agent header.
// Docs: https://photon.komoot.io

module.exports.geocodeLocation = async (location, country) => {
    const query = [location, country].filter(Boolean).join(", ");
    if (!query) return null;

    const url = `https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Casandra-App/1.0 (contact: dev@example.com)"
            }
        });

        if (!response.ok) {
            console.error("Geocoding request failed:", response.status);
            return null;
        }

        const data = await response.json();
        if (!data || !data.features || data.features.length === 0) {
            return null;
        }

        // Photon already returns GeoJSON, coordinates are [lon, lat]
        const coordinates = data.features[0].geometry.coordinates;

        return {
            type: "Point",
            coordinates
        };
    } catch (err) {
        console.error("Geocoding error:", err);
        return null;
    }
};