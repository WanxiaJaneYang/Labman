import { Router } from "express";
import { getBorrowedEquipments } from '../controllers/borrow/getBorrowEquipment.js';
import { getBorrowSearch } from '../controllers/borrow/getBorrowSearch.js';
import { changeBorrowStatus } from '../controllers/borrow/postReturnSearch.js';
import { cancelReturn } from '../controllers/borrow/postReturnCancel.js';



const borrowRouter = Router();

borrowRouter.get("/", getBorrowedEquipments);

borrowRouter.get("/borrowSearch", getBorrowSearch);

borrowRouter.post("/borrowStatus", changeBorrowStatus);

borrowRouter.post("/cancelReturn", cancelReturn);

export { borrowRouter };