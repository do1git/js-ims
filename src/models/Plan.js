import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  model: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Pump" },
  status: { type: String, default: "wait" },
  approved_id: { type: String, required: true },
  ordered_date: { type: Date },
  planned_manufaturing_date: { type: Date },
  manufactured_date: { type: Date },
  planned_outbound_date: { type: Date },
  outbound_date: { type: Date },
  manufaturing_Def: { type: String },
  memo: { type: String },
  filePath: [{ type: String }],
});

const Plan = mongoose.model("Plan", PlanSchema);

export default Plan;
