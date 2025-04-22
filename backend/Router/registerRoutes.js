import express from "express";
import multer from "multer";
import Register from "../structure/Register.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// GET all registered hotels
router.get("/", async (req, res) => {
  try {
    const register = await Register.find();
    res.status(200).json(register);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotels", error });
  }
});

// Route to handle hotel form submission
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "licenseDocument", maxCount: 1 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      if (!req.body.facilities) {
        return res.status(400).json({ message: "Facilities field is required" });
      }

      if (!req.body.description) {
        return res.status(400).json({ message: "Description field is required" });
      }

      const { propertyType, facilities } = req.body;
      let parsedFacilities;
      try {
        parsedFacilities = JSON.parse(facilities);
      } catch (error) {
        return res.status(400).json({ message: "Invalid facilities format" });
      }

      const newHotel = new Register({
        hotelName: req.body.hotelName,
        vendorName: req.body.vendorName,
        country: req.body.country,
        city: req.body.city,
        location: req.body.location,
        email: req.body.email,
        phone: req.body.phone,
        tinNumber: req.body.tinNumber,
        propertyType,
        description: req.body.description,
        roomType: req.body.roomType,
        facilities: parsedFacilities,
        licenseDocument: req.files["licenseDocument"]
          ? req.files["licenseDocument"][0].filename
          : "",
        hotelImages: req.files["images"]
          ? req.files["images"].map((file) => file.filename)
          : [],
        hotelVideos: req.files["videos"]
          ? req.files["videos"].map((file) => file.filename)
          : [],
      });

      await newHotel.save();
      res.status(201).json({ message: "Hotel registered successfully!" });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => err.message),
        });
      }
      res.status(500).json({ 
        message: "Failed to register hotel", 
        error: error.message 
      });
    }
  }
);

// PUT update vendor status
router.put("/:id", async (req, res) => {
  try {
    const updatedVendor = await Register.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ 
      message: "Failed to update vendor status", 
      error: error.message 
    });
  }
});

export default router;