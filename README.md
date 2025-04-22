# Hotel Booking Application

A full-stack hotel booking application built with React, Node.js, Express, and MongoDB.

## Features

- Browse and search hotels
- Filter hotels by location, city, country, dates, and number of guests
- View detailed hotel information including amenities and room types
- Book hotel rooms
- User authentication (login/register)
- View and manage bookings

## Project Structure

```
customer_booking/
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/            # React source files
│       ├── components/ # React components
│       ├── App.js      # Main React component
│       └── index.js    # Entry point
└── server/             # Node.js backend
    ├── models/         # MongoDB models
    ├── routes/         # API routes
    ├── index.js        # Server entry point
    └── seed.js         # Database seeding script
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
   ```
   cd customer_booking/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Seed the database with sample data:
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm run dev
   ```

The server will run on http://localhost:5001

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd customer_booking/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The client will run on http://localhost:3000

## API Endpoints

### Hotels

- `GET /api/hotels` - Get all hotels (with optional filters)
- `GET /api/hotels/:id` - Get a single hotel by ID
- `POST /api/hotels` - Create a new hotel (admin only)
- `PUT /api/hotels/:id` - Update a hotel (admin only)
- `DELETE /api/hotels/:id` - Delete a hotel (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings for the authenticated user
- `POST /api/bookings` - Create a new booking
- `DELETE /api/bookings/:id` - Cancel a booking

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get the current user's profile

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS with responsive design

## License

MIT 