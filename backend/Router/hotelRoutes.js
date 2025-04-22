import express from "express";
import multer from "multer";
import Hotel from "../structure/Hotel.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// POST new hotel with images and documents
router.post("/", upload.fields([
  { name: "images", maxCount: 10 },
  { name: "licenseDocument", maxCount: 1 },
  { name: "videos", maxCount: 5 }
]), async (req, res) => {
  try {
    let hotelData;
    
    // Check if the request contains files (FormData) or direct JSON data
    if (req.files) {
      // Handle FormData submission
      hotelData = {
        ...req.body,
        hotelImages: req.files["images"] ? req.files["images"].map(file => file.filename) : [],
        licenseDocument: req.files["licenseDocument"] ? req.files["licenseDocument"][0].filename : "",
        hotelVideos: req.files["videos"] ? req.files["videos"].map(file => file.filename) : [],
        facilities: JSON.parse(req.body.facilities || "[]"),
        roomType: JSON.parse(req.body.roomType || "[]"),
        status: true
      };
    } else {
      // Handle direct JSON submission (from vendor approval)
      hotelData = {
        ...req.body,
        facilities: Array.isArray(req.body.facilities) ? req.body.facilities : JSON.parse(req.body.facilities || "[]"),
        roomType: Array.isArray(req.body.roomType) ? req.body.roomType : JSON.parse(req.body.roomType || "[]")
      };
    }

    const newHotel = new Hotel(hotelData);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    console.error("Hotel creation failed:", error.message);
    res.status(500).json({ error: "Failed to create hotel.", details: error.message });
  }
});

// GET a single hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update hotel
router.put("/:id", upload.fields([
  { name: "images", maxCount: 10 },
  { name: "licenseDocument", maxCount: 1 },
  { name: "videos", maxCount: 5 }
]), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.files) {
      if (req.files["images"]) {
        updateData.hotelImages = req.files["images"].map(file => file.filename);
      }
      if (req.files["licenseDocument"]) {
        updateData.licenseDocument = req.files["licenseDocument"][0].filename;
      }
      if (req.files["videos"]) {
        updateData.hotelVideos = req.files["videos"].map(file => file.filename);
      }
    }

    if (req.body.facilities) {
      updateData.facilities = JSON.parse(req.body.facilities);
    }
    if (req.body.roomType) {
      updateData.roomType = JSON.parse(req.body.roomType);
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hotel." });
  }
});

// DELETE hotel
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

export default router;