import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/gmims", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
const handleOpen = () => console.log("🟢 Connected to DB");
db.on("error", (error) => console.log("🔴 DB Error", error));
db.once("open", handleOpen);
