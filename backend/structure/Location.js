import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  
  
});

const Location = mongoose.model("Location", locationSchema);
export default Location;