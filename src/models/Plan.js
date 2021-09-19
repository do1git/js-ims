import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  model: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Pump" },
  reference: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],

  status: { type: String, default: "wait", required: true },

  approved_id: { type: String, required: true },
  quantity: { type: Number, required: true },

  ordered_date: { type: Date },
  planned_manufacturing_date: { type: Date },
  manufacturing_date: { type: Date },
  planned_outbound_date: { type: Date },
  outbound_date: { type: Date },

  manufacturing_department: { type: String, required: true },
  memo: { type: String },

  file_Paths: [{ type: String }],
  file_thumbnail: { type: String },

  member: [{ type: String }],
  packaging: { type: String, required: true },

  uploader_plan: [{ type: String }],
  uploader_photo: [{ type: String }],
});

const Plan = mongoose.model("Plan", PlanSchema);

export default Plan;
