import mongoose from "mongoose";

const pumpSchema = new mongoose.Schema({
  user: { type: String, required: true, uppercase: true },
  name: { type: String, required: true, uppercase: true },
  free_flowRate: { type: String, required: true },
  code: { type: String, required: true, uppercase: true },
  version: { type: String, required: true },
  coating: { type: String, required: true, uppercase: true },
  lastEdit: { type: Date },
  current: { type: String, required: true, uppercase: true },
  domestic: { type: Boolean, required: true },
});

const Pump = mongoose.model("Pump", pumpSchema);

export default Pump;
