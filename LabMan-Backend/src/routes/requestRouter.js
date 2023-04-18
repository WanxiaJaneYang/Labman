import { Router } from "express";
import { getRequests } from '../controllers/request/getRequests.js';
// import { newRequest } from '../controllers/request/newRequest.js';
// import { pickRequest } from '../controllers/request/pickRequest.js';

const requestRouter = Router();

//query all request records
requestRouter.get("/", getRequests);

// // Create a new reqest record and insert a log into request Log table
// requestRouter.post("/", newRequest);

// // Create a new borrowing record and insert a log into Equipment Log table
// requestRouter.post("/pick", pickRequest);


export { requestRouter };