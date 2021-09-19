import mongoose from "mongoose";
import { jsDayToKday } from "../middlewares";

const pumpSchema = new mongoose.Schema({
  user: { type: String, required: true },

  free_flowRate: { type: String, required: true },
  code: { type: String, required: true, uppercase: true },
  name: { type: String, required: true, uppercase: true },

  motor: { type: String, required: true, uppercase: true },
  coating: { type: String, required: true, uppercase: true },

  version: { type: String, required: true },
  lastEdit: { type: Date },

  domestic: { type: Boolean, required: true },
});

// pumpSchema.pre("save", function () {
//   if (this.isModified("lastEdit")) {
//     this.lastEdit.kday = jsDayToKday(this.lastEdit);
//   }
// });

const Pump = mongoose.model("Pump", pumpSchema);

export default Pump;
