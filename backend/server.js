import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import hotelRoutes from "./Router/hotelRoutes.js";
import countryRoutes from "./Router/countryRoutes.js";  
import cityRoutes from "./Router/cityRoutes.js";  
import locationRoutes from "./Router/locationRoutes.js"
import registerRoutes from "./Router/registerRoutes.js"




// Load env variables
dotenv.config();

// Connect to DB
ConnectDB();

const app = express();

app.use(cors());

// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use("/api/register", registerRoutes);





app.use("/api/hotels", hotelRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/locations", locationRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});