import { Router } from "express";
import { getRequests } from '../controllers/request/getRequests.js';
import { newRequest } from '../controllers/request/newRequest.js';
import { collectRequest } from '../controllers/request/collectRequest.js';
import { cancelRequest } from '../controllers/request/cancelRequest.js';

const requestRouter = Router();

//query request records
requestRouter.get("/", getRequests);

// Create a new reqest record and insert a log into request Log table
requestRouter.post("/", newRequest);

// Create a new borrowing record and insert a log into Equipment Log table
requestRouter.patch("/collect/:request_id", collectRequest);

//change the status of request to be cancelled
requestRouter.patch("/cancel/:request_id", cancelRequest);

export { requestRouter };