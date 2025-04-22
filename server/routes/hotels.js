const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const { city, country, location, checkIn, checkOut, guests } = req.query;
    let query = {};

    if (city) {
      query.city = new RegExp(city, 'i');
    }
    if (country) {
      query.country = new RegExp(country, 'i');
    }
    if (location) {
      query['location.address'] = new RegExp(location, 'i');
    }

    const hotels = await Hotel.find(query);
    
    // If checkIn, checkOut, and guests are provided, filter hotels with available rooms
    if (checkIn && checkOut && guests) {
      // This is a simplified filtering. In a real app, you would check room availability
      // based on the dates and number of guests
      const filteredHotels = hotels.filter(hotel => {
        // Check if hotel has rooms that can accommodate the number of guests
        const suitableRooms = hotel.rooms.filter(room => 
          room.available && room.type === 'Double' || 
          (room.type === 'Suite' && guests <= 4) || 
          (room.type === 'Deluxe' && guests <= 6)
        );
        return suitableRooms.length > 0;
      });
      
      return res.json(filteredHotels);
    }

    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create hotel (admin only)
router.post('/', async (req, res) => {
  try {
    console.log('Received hotel data:', req.body);
    
    // Ensure required fields are present
    if (!req.body.name || !req.body.description || !req.body.city || !req.body.country || !req.body.location || !req.body.location.address) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'description', 'city', 'country', 'location.address']
      });
    }
    
    // Set default values for optional fields
    if (!req.body.images) req.body.images = [];
    if (!req.body.rooms) req.body.rooms = [];
    if (!req.body.amenities) req.body.amenities = [];
    if (!req.body.rating) req.body.rating = 0;
    
    // Ensure location coordinates are present
    if (!req.body.location.coordinates) {
      req.body.location.coordinates = { lat: 0, lng: 0 };
    }
    
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update hotel (admin only)
router.put('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete hotel (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 