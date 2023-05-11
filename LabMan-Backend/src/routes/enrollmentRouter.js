import { Router } from "express";
import { getEnrollmentByCourse} from "../controllers/enrollment/apiFunctions/getEnrollmentByCourse.js";
import { newEnrollment} from "../controllers/enrollment/apiFunctions/newEnrollment.js";
import { deleteEnrollment } from "../controllers/enrollment/apiFunctions/deleteEnrollment.js";

const enrollmentRouter = Router();

enrollmentRouter.get("/", getEnrollmentByCourse);
  
enrollmentRouter.post("/",newEnrollment);

enrollmentRouter.delete("/:course_id", deleteEnrollment);

export { enrollmentRouter };