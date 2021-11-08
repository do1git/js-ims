import mongoose from "mongoose";

const SparepartSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, uppercase: true },
  lastEdit: { type: Date, required: true },
  file: { type: String },
});

const Sparepart = mongoose.model("Sparepart", SparepartSchema);

export default Sparepart;
//지금 스페어파츠 디비에 사진정보안들어감
