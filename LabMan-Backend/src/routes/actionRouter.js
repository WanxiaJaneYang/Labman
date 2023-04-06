import { Router } from "express";
import express from "express";
import { getAllBorrow } from '../controllers/action/getBorrow.js';
import { newBorrow } from '../controllers/action/postBorrow.js';

const actionRouter = Router();
actionRouter.use(express.json());

//query all borrow records
actionRouter.get("/borrow", getAllBorrow);

// Create a new borrowing record and insert a log into Equipment Log table
actionRouter.post('/borrow', newBorrow);



export { actionRouter };