const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');

// Sample hotel data
const sampleHotels = [
  {
    name: 'Grand Luxury Hotel',
    description: 'Experience luxury at its finest with our premium amenities and world-class service.',
    city: 'New York',
    country: 'USA',
    location: 'Manhattan',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    rooms: [
      {
        type: 'Single',
        price: 150,
        available: true
      },
      {
        type: 'Double',
        price: 250,
        available: true
      },
      {
        type: 'Suite',
        price: 400,
        available: true
      }
    ],
    rating: 4.5,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service']
  },
  {
    name: 'Seaside Resort',
    description: 'Enjoy breathtaking ocean views and beachfront access at our seaside resort.',
    city: 'Miami',
    country: 'USA',
    location: 'South Beach',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    rooms: [
      {
        type: 'Double',
        price: 200,
        available: true
      },
      {
        type: 'Suite',
        price: 350,
        available: true
      },
      {
        type: 'Deluxe',
        price: 500,
        available: true
      }
    ],
    rating: 4.2,
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar', 'WiFi', 'Spa']
  },
  {
    name: 'Mountain View Lodge',
    description: 'Escape to the mountains and enjoy the tranquility of nature at our lodge.',
    city: 'Denver',
    country: 'USA',
    location: 'Rocky Mountains',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    rooms: [
      {
        type: 'Single',
        price: 120,
        available: true
      },
      {
        type: 'Double',
        price: 180,
        available: true
      },
      {
        type: 'Suite',
        price: 300,
        available: true
      }
    ],
    rating: 4.7,
    amenities: ['Hiking Trails', 'Restaurant', 'WiFi', 'Fireplace', 'Spa']
  },
  {
    name: 'Urban Boutique Hotel',
    description: 'A stylish boutique hotel in the heart of the city with modern amenities.',
    city: 'San Francisco',
    country: 'USA',
    location: 'Downtown',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    rooms: [
      {
        type: 'Single',
        price: 180,
        available: true
      },
      {
        type: 'Double',
        price: 280,
        available: true
      }
    ],
    rating: 4.3,
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Gym', 'Room Service']
  },
  {
    name: 'Historic Inn',
    description: 'Step back in time at our historic inn with charming architecture and period furnishings.',
    city: 'Boston',
    country: 'USA',
    location: 'Historic District',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    rooms: [
      {
        type: 'Single',
        price: 160,
        available: true
      },
      {
        type: 'Double',
        price: 220,
        available: true
      },
      {
        type: 'Suite',
        price: 350,
        available: true
      }
    ],
    rating: 4.6,
    amenities: ['WiFi', 'Restaurant', 'Library', 'Garden', 'Breakfast Included']
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel-booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  
  // Clear existing hotels
  return Hotel.deleteMany({});
})
.then(() => {
  console.log('Cleared existing hotels');
  
  // Insert sample hotels
  return Hotel.insertMany(sampleHotels);
})
.then(() => {
  console.log('Sample hotels added successfully');
  process.exit(0);
})
.catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
}); 