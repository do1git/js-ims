import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  byWhom: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toTarget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: { type: String, required: true },
  type: { type: String, required: true }, //userInfo-modified
  createdAt: { type: Date, required: true, default: Date.now() },

  detail: { type: String },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
