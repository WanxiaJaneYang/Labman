import { Router } from "express";
import { getRequests } from "../controllers/request/apiFunctions/getRequests.js";
import { newRequest } from "../controllers/request/apiFunctions/newRequest.js";
import { collectRequest } from "../controllers/request/apiFunctions/collectRequest.js";
import { cancelRequest } from "../controllers/request/apiFunctions/cancelRequest.js";
import { editRequest } from "../controllers/request/apiFunctions/editRequest.js";

const requestRouter = Router();

//query request records
requestRouter.get("/", getRequests);

// Create a new reqest record and insert a log into request Log table
requestRouter.post("/", newRequest);

// Create a new borrowing record and insert a log into Equipment Log table
requestRouter.patch("/collect/:request_id",collectRequest);

//change the status of request to be cancelled
requestRouter.patch("/cancel/:request_id",cancelRequest);

//edit request record
requestRouter.put("/:request_id", editRequest);

export { requestRouter };