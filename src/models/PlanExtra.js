import mongoose from "mongoose";

const PlanExtraSchema = new mongoose.Schema({
  plan: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Plan" },
  Extra: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Sparepart",
  },
  quantity: { type: String, required: true },
});
const PlanExtra = mongoose.model("PlanExtra", PlanExtraSchema);

export default PlanExtra;
