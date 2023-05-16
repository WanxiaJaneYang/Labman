import { Router } from "express";

import { newTypeInPackage} from "../controllers/typePackage/apiFunctions/newTypeInPackage.js";
import {getTypeByPackageId} from "../controllers/typePackage/apiFunctions/getTypeByPackageId.js";

const typePackageRouter = Router();

typePackageRouter.get("/:package_id", getTypeByPackageId);

typePackageRouter.post("/:package_id/:type_id", newTypeInPackage);

export { typePackageRouter };