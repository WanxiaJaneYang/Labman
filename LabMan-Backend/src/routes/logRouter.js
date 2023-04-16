import { Router } from "express";
import { getAlllogs} from '../controllers/log/getAllLogs.js';



const logRouter = Router();

//query all users
logRouter.get("/", getAlllogs);
  

export { logRouter };