# Casandra

Casandra is a full-stack property listing and booking platform inspired by Airbnb. Users can browse property listings, search by destination, view listings on an interactive map, sign up and log in, create and manage their own listings, and leave reviews on properties.

**Live demo:** [casandra-production.up.railway.app](https://casandra-production.up.railway.app/)

## Features

- **Browse & search listings** — view all listings in a responsive grid, or search by title, location, or country
- **Interactive maps** — every listing's location is geocoded automatically and displayed on a live map with a marker
- **User authentication** — sign up, log in, and log out securely with hashed passwords (Passport.js)
- **Create, edit, and delete listings** — logged-in users can host their own properties, complete with image upload
- **Image uploads** — listing photos are uploaded and stored via Cloudinary
- **Reviews & ratings** — logged-in users can leave a star rating and comment on any listing
- **Ownership & permissions** — only a listing's owner can edit or delete it; only a review's author can delete their review
- **Persistent sessions** — sessions are stored in MongoDB, so logins survive server restarts
- **Flash messages** — clear success/error feedback after actions like login, listing creation, or deletion

## Tech Stack

**Backend**

- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Passport.js](https://www.passportjs.org/) (local strategy) for authentication
- [connect-mongo](https://www.npmjs.com/package/connect-mongo) for persistent sessions

**Frontend**

- [EJS](https://ejs.co/) with [ejs-mate](https://www.npmjs.com/package/ejs-mate) for templating/layouts
- [Bootstrap 5](https://getbootstrap.com/) for styling
- [Leaflet.js](https://leafletjs.com/) + OpenStreetMap for interactive maps

**Other services**

- [Cloudinary](https://cloudinary.com/) for image storage
- [Photon (Komoot)](https://photon.komoot.io/) for free geocoding (converting listing locations into map coordinates)
- [Joi](https://joi.dev/) for server-side data validation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)
- A [Cloudinary](https://cloudinary.com/) account (free tier is fine)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/KavyaThakre/Casandra.git
   cd Casandra
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:

   ```env
   ATLAS_DB_URL=your_mongodb_connection_string
   SESSION_SECRET=a_long_random_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development server
   ```bash
   npx nodemon app.js
   ```
   The app will be running at [http://localhost:8080](http://localhost:8080).

### Seeding sample data (optional)

To populate the database with sample listings:

```bash
node init.js
```

Then geocode them so their maps render correctly:

```bash
node migrateGeocode.js
```

> ⚠️ `init.js` clears all existing listings before inserting new ones — use with care on a database you care about.

## Project Structure

```
Casandra/
├── controllers/     # Route handler logic
├── models/          # Mongoose schemas (Listing, User, Review)
├── routes/          # Express route definitions
├── views/           # EJS templates
├── public/          # Static assets (CSS, client-side JS, images)
├── util/            # Helper utilities (error handling, async wrapper, geocoding)
├── middelware.js    # Auth & validation middleware
├── cloudConfig.js   # Cloudinary configuration
├── schema.js        # Joi validation schemas
└── app.js           # App entry point
```

## Deployment

This project is deployed on [Railway](https://railway.app/). Environment variables are configured directly in the Railway dashboard rather than committed to the repository.

## License

ISC
