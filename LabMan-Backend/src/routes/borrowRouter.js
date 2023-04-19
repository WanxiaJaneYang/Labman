import { Router } from "express";
import { getBorrowedEquipments } from '../controllers/borrow/getBorrowEquipment.js';
import { getBorrowSearch } from '../controllers/borrow/getBorrowSearch.js';
import { changeBorrowStatus } from '../controllers/borrow/postReturnSearch.js';
import { cancelReturn } from '../controllers/borrow/postReturnCancel.js';



const borrowRouter = Router();

borrowRouter.get("/", getBorrowedEquipments);

borrowRouter.get("/", getBorrowSearch);

borrowRouter.post("/", changeBorrowStatus);

borrowRouter.post("/", cancelReturn);

export { borrowRouter };