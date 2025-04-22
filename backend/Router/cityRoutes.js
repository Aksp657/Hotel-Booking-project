import express from "express";
import City from "../structure/City.js";  

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

// POST new hotel
router.post("/", async (req, res) => {
  const newCity = new City(req.body);
  const savedCity = await newCity.save();
  res.json(savedCity);
});

// PUT update hotel
// PUT /api/hotels/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(
      req.params.id,
      req.body, // should include isActive
      { new: true }
    );
    res.json(updatedCity);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hotel." });
  }
});

// DELETE hotel
router.delete("/:id", async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.json({ message: "Hotel deleted" });
});

export default router;
