import express from "express";
import Country from "../structure/Countries.js";

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
});

// POST new hotel
router.post("/", async (req, res) => {
  const newCountry = new Country(req.body);
  const savedCountry = await newCountry.save();
  res.json(savedCountry);
});

// PUT update hotel
// PUT /api/hotels/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      req.body, // should include isActive
      { new: true }
    );
    res.json(updatedCountry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hotel." });
  }
});

// DELETE hotel
router.delete("/:id", async (req, res) => {
  await Country.findByIdAndDelete(req.params.id);
  res.json({ message: "Hotel deleted" });
});

export default router;
