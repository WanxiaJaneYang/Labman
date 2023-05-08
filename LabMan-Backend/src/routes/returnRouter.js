import { Router } from "express";
import { getReturns } from "../controllers/return_borrowing/apiFunctions/getReturns.js";
import { confirmReturn } from "../controllers/return_borrowing/apiFunctions/confirmReturn.js";
import { cancelReturn } from "../controllers/return_borrowing/apiFunctions/cancelReturn.js";

const returnRouter = Router();

// get all returns or conditionnally get some returns
returnRouter.get("/", getReturns);

// confirm the equipment is returned
returnRouter.patch("/:borrow_id", confirmReturn);

// cancel returning some of the equipment
returnRouter.patch("/cancel/:borrow_id", cancelReturn);

export { returnRouter };