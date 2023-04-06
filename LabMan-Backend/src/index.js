import app from "../app.js";
import { v1Router } from "./routes/index.js";
import express from "express";
import dotenv from "dotenv";

import { connectToDatabase } from './utils/MySQL/db.js';
dotenv.config();
const PORT = process.env.PORT;
connectToDatabase();

app.use(express.json());

app.use(v1Router);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

