import { Router } from "express";

import { newTypeInPackage} from "../controllers/typePackage/apiFunctions/newTypeInPackage.js";
import {getTypeByPackageId} from "../controllers/typePackage/apiFunctions/getTypeByPackageId.js";
import {deleteTypeInPackage} from "../controllers/typePackage/apiFunctions/deleteTypeInPackage.js";
import {updateTypeInPackage} from "../controllers/typePackage/apiFunctions/putTypeInPackage.js";
import {getTypePackageRelation} from "../controllers/typePackage/apiFunctions/getTypePackageRelation.js";
const typePackageRouter = Router();

typePackageRouter.get("/:package_id", getTypeByPackageId);
typePackageRouter.get("/:package_id/:type_id", getTypePackageRelation);

typePackageRouter.post("/:package_id/:type_id", newTypeInPackage);
typePackageRouter.delete("/:package_id/:type_id", deleteTypeInPackage);
typePackageRouter.put("/:package_id/:type_id", updateTypeInPackage);

export { typePackageRouter };