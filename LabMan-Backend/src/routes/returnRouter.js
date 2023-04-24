import { Router } from "express";
import { getReturns } from "../controllers/return/getReturns.js";

const returnRouter = Router();

returnRouter.get("/", getReturns);

export { returnRouter };