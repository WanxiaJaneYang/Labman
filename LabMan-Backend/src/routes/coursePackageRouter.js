import { Router } from "express";
import { getPackageByCourse} from "../controllers/coursePackage/apiFunctions/getPackageByCourse.js";
import { newPackage} from "../controllers/coursePackage/apiFunctions/newPackage.js";
import { deletePackage } from "../controllers/coursePackage/apiFunctions/deletePackage.js";

const coursePackageRouter = Router();

coursePackageRouter.get("/", getPackageByCourse);
  
coursePackageRouter.post("/",newPackage);

coursePackageRouter.delete("/:course_id", deletePackage);

export { coursePackageRouter };