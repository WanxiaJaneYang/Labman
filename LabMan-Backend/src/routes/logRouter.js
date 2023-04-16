import { Router } from "express";
import { getAllLogs} from '../controllers/logs/getAllLogs.js';



const logRouter = Router();

//query all users
logRouter.get("/", getAllLogs);
  

export { logRouter };