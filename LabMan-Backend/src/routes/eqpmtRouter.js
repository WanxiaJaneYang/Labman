import { Router } from "express";
import { getAllEquipmentTypes } from '../controllers/equipment/getEquipment.js';
import { editEquipment } from '../controllers/equipment/putEquipment.js';
import { newEquipmentType} from '../controllers/equipment/postEquipment.js';
import { deleteEquipment} from '../controllers/equipment/deleteEquipment.js';
import { searchEquipment} from '../controllers/equipment/getSearch.js';


const eqpmtRouter = Router();

eqpmtRouter.get("/", getAllEquipmentTypes);

eqpmtRouter.get("/search", searchEquipment);

eqpmtRouter.put("/", editEquipment);

eqpmtRouter.post("/", newEquipmentType);

eqpmtRouter.delete("/", deleteEquipment);

export { eqpmtRouter };