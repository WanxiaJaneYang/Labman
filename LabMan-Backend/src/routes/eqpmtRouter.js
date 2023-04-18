import { Router } from "express";
import { getAllEquipmentTypes } from "../controllers/equipment/getEquipment.js";
import { newEquipmentType} from "../controllers/equipment/postEquipment.js";
import { deleteEquipment } from "../controllers/equipment/deleteEquipment.js";
import { editEquipment } from "../controllers/equipment/putEquipment.js";

const eqpmtRouter = Router();

eqpmtRouter.get("/", getAllEquipmentTypes);

eqpmtRouter.post("/", newEquipmentType);

eqpmtRouter.delete("/:type_id", deleteEquipment);

eqpmtRouter.put("/:type_id", editEquipment);

export { eqpmtRouter };