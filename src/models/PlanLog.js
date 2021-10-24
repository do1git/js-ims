import mongoose from "mongoose";

const PlanLogSchema = new mongoose.Schema({
  purpose: { required: true, type: String }, //data log
  plan: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Plan" },

  who: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  when: { required: true, type: Date, default: Date.now() },
  whichProcess: { required: true, type: String }, //plan done outbound edit
  what: { required: true, type: String }, //register reregjster edit(for edit)
});

const PlanLog = mongoose.model("PlanLog", PlanLogSchema);

export default PlanLog;

// for (let i = 0; i < memberId__assembly.length; i++) {
//   await PlanLog.create({
//     plan: id,
//     who: memberId__assembly[i],
//     when: Date.now(),
//     whichProcess: "done",
//     what: "register",
//   });
// }
