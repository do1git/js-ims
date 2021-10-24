import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema({
  user: { type: String, required: true },

  free_flowRate: { type: String, required: true },
  code: { type: String, required: true, uppercase: true },
  name: { type: String, required: true, uppercase: true },

  date: { type: Date, required: true },
  did: [{ type: String }],
});

const DailyLog = mongoose.model("DailyLog", DailyLogSchema);

export default DailyLog;
