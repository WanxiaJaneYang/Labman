import { Router } from "express";
import { getRequestLogs} from '../controllers/logs/getRequestLogs.js';

const logRouter = Router();

//query all users
logRouter.get("/request", getRequestLogs);
  
export { logRouter };