import dotenv from "dotenv";
import app from "../app.js";
import { testRouter } from "./routes/testRouter.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(testRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});