import express from "express";
import Location from "../structure/Location.js";

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

// GET: Number of locations per city
router.get("/city-counts", async (req, res) => {
  try {
    const counts = await Location.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: "Failed to get city counts." });
  }
});


// POST new hotel
router.post("/", async (req, res) => {
  const newLocation = new Location(req.body);
  const savedLocation = await newLocation.save();
  res.json(savedLocation);
});

// PUT update hotel
// PUT /api/hotels/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body, // should include isActive
      { new: true }
    );
    res.json(updatedLocation);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hotel." });
  }
});

// DELETE hotel
router.delete("/:id", async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Hotel deleted" });
});

export default router;
