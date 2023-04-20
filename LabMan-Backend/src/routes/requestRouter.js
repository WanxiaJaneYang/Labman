import { Router } from "express";
import { getAllRequests } from '../controllers/request/getAllRequests.js';
import { getfilteredRequests } from '../controllers/request/getfilteredRequests.js';
import { newRequest } from '../controllers/request/newRequest.js';
import { collectRequest } from '../controllers/request/collectRequest.js';
import { cancelRequest } from '../controllers/request/cancelRequest.js';

const requestRouter = Router();

//query all request records
requestRouter.get("/", getAllRequests);

//query filtered request records
requestRouter.get("/filter", getfilteredRequests);

// Create a new reqest record and insert a log into request Log table
requestRouter.post("/", newRequest);

// Create a new borrowing record and insert a log into Equipment Log table
requestRouter.post("/collect", collectRequest);

//change the status of request to be cancelled
requestRouter.put("/:request_id/cancel", cancelRequest);

export { requestRouter };