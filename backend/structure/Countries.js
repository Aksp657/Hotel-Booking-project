import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
  dialcode: String,
  cities: [String],
  
});

const Country = mongoose.model("Country", countrySchema);
export default Country;