import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: String,
  country: String,
  is_popular: String,
  
  
});

const City = mongoose.model("City", citySchema);
export default City;