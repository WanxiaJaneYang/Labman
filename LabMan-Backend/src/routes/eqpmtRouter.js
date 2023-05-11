import { Router } from "express";
import { getEquipmentTypes } from "../controllers/equipment/apiFunctions/getEquipment.js";
import { newEquipmentType } from "../controllers/equipment/apiFunctions/postEquipment.js";
import { deleteEquipment } from "../controllers/equipment/apiFunctions/deleteEquipment.js";
import { editEquipment } from "../controllers/equipment/apiFunctions/putEquipment.js";

const eqpmtRouter = Router();

eqpmtRouter.get("/", getEquipmentTypes);

eqpmtRouter.post("/", newEquipmentType);

eqpmtRouter.delete("/:type_id", deleteEquipment);

eqpmtRouter.put("/:type_id", editEquipment);

export { eqpmtRouter };