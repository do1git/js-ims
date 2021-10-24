import "dotenv/config";
import "./db";
import "./models/Pump";
import "./models/Plan";
import "./models/PlanLog";
import "./models/User";
import "./models/Event";
import app from "./server";

const PORT = 5000;
const handleListening = () =>
  console.log(`🟢 Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
