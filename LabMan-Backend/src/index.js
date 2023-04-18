import app from "../app.js";
import { v1Router } from "./routes/index.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/MySQL/db.js";
import cors from "cors";

dotenv.config();

app.use(cors());

const PORT = 3008;
connectToDatabase();

app.use(v1Router);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
