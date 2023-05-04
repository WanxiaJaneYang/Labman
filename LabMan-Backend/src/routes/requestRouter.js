import { Router } from "express";
import { getRequests } from "../controllers/request/getRequests.js";
import { newRequest } from "../controllers/request/newRequest.js";
import { collectRequest } from "../controllers/request/collectRequest.js";
import { cancelRequest } from "../controllers/request/cancelRequest.js";
import { editRequest } from "../controllers/request/editRequest.js";

const requestRouter = Router();

//query request records
requestRouter.get("/", (req,res) => {
    getRequests(req).then((results) => {
        res.status(200).json(results);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

// Create a new reqest record and insert a log into request Log table
requestRouter.post("/", (req,res) => {
    newRequest(req).then(() => {
        res.status(200).json({ success: "Request created and log inserted successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

// Create a new borrowing record and insert a log into Equipment Log table
requestRouter.patch("/collect/:request_id", (req,res) => {
    collectRequest(req).then(() => {
        res.status(200).json({ success: "Request collected and log inserted successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
//change the status of request to be cancelled
requestRouter.patch("/cancel/:request_id", (req,res) => {
    cancelRequest(req).then(() => {
        res.status(200).json({ success: "Request cancelled successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
//edit request record
requestRouter.put("/:request_id",  (req,res) => {
    editRequest(req).then(() => {
        res.status(200).json({ success: "Request updated and log inserted successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

export { requestRouter };