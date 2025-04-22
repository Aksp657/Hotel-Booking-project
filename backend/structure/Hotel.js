import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  vendorName: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  tinNumber: { type: String, required: true },
  propertyType: { type: String, required: true },
  description: { type: String, required: true },
  roomType: { type: [String], default: [] },
  facilities: { type: [String], default: [] },
  licenseDocument: { type: String },
  hotelImages: { type: [String], default: [] },
  hotelVideos: { type: [String], default: [] },
  status: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;