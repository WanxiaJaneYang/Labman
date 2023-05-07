import { Router } from "express";
import { getReturns } from "../controllers/return_borrowing/apiFunctions/getReturns.js";
import { confirmReturn } from "../controllers/return_borrowing/apiFunctions/confirmReturn.js";

const returnRouter = Router();

// get all returns or conditionnally get some returns
returnRouter.get("/", getReturns);

// confirm the equipment is returned
returnRouter.patch("/:borrow_id", confirmReturn);

export { returnRouter };