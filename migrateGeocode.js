
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const { geocodeLocation } = require("./util/geocode.js");

async function main() {
    await mongoose.connect(process.env.ATLAS_DB_URL);
    console.log("DB connected");

    const listings = await Listing.find({
        $or: [
            { geometry: { $exists: false } },
            { "geometry.coordinates": { $exists: false } }
        ]
    });

    console.log(`Found ${listings.length} listing(s) without coordinates.`);

    for (const listing of listings) {
        console.log(`Geocoding: ${listing.title} (${listing.location}, ${listing.country})`);

        const geometry = await geocodeLocation(listing.location, listing.country);

        if (geometry) {
            listing.geometry = geometry;
            await listing.save();
            console.log(`  -> saved coordinates: ${geometry.coordinates}`);
        } else {
            console.log(`  -> could not geocode, skipping`);
        }

        // Nominatim's usage policy asks for max 1 request per second
        await new Promise((resolve) => setTimeout(resolve, 1100));
    }

    console.log("Done.");
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});