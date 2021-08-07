import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  user: { type: String, required: true },
  flowRate: { type: Number, required: true },
  operation: { type: String, required: true, uppercase: true },
  purpose: { type: String, required: true, uppercase: true },
  structure: { type: String, required: true, uppercase: true },
  coating: { type: String, required: true },
  mainPic: { type: String, default: null },
  //   user: { type: String },
  //   motor: {
  //     type: String,
  //     size: String,
  //     voltage: Number,
  //   },
  //   application: { type: String },
  //   version: { type: String },
  //   description: { type: String },
});

const Pump = mongoose.model("Pump", pumpSchema);

export default Pump;
