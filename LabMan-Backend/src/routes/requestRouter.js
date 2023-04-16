import { Router } from "express";
import { getRequests } from '../controllers/request/getRequests.js';
import { newRequest } from '../controllers/request/newRequest.js';
import { pickRequest } from '../controllers/request/pickRequest.js';

const requestRouter = Router();

//query all request records
requestRouter.get("/request", getRequests);

// Create a new request record and insert a log into request Log table
requestRouter.post('/request', newRequest);

// Create a new borrowing record and insert a log into Equipment Log table
requestRouter.post('/request/pick', pickRequest);


export { requestRouter };