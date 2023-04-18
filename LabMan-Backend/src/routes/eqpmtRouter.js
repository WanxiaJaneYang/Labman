import { Router } from "express";
import { getAllEquipmentTypes } from '../controllers/equipment/getEquipment.js';
import { newEquipmentType} from '../controllers/equipment/postEquipment.js';


const eqpmtRouter = Router();

eqpmtRouter.get("/", getAllEquipmentTypes);

eqpmtRouter.post("/", newEquipmentType);

export { eqpmtRouter };