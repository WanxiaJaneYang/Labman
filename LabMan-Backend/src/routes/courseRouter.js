import { Router } from "express";

import { getCourse} from "../controllers/course/apiFunctions/getCourse.js";
import { newCourse} from "../controllers/course/apiFunctions/postCourse.js";
import { updateCourse} from "../controllers/course/apiFunctions/putCourse.js";
import { deleteCourse} from "../controllers/course/apiFunctions/deleteCourse.js";
import { getEnrollmentByCourse} from "../controllers/enrollment/apiFunctions/getEnrollmentByCourse.js";
import { newEnrollment} from "../controllers/enrollment/apiFunctions/newEnrollment.js";
import { newEnrollmentBatch} from "../controllers/enrollment/apiFunctions/newEnrollmentBatch.js";
import { deleteEnrollment } from "../controllers/enrollment/apiFunctions/deleteEnrollment.js";
import { getCourseById } from "../controllers/course/apiFunctions/getCourse.js";

const courseRouter = Router();

courseRouter.get("/", getCourse);
courseRouter.get("/:course_id", getCourseById);
  
courseRouter.post("/", newCourse);

courseRouter.put("/:course_id", updateCourse);

courseRouter.delete("/:course_id", deleteCourse);

courseRouter.get("/:course_id/enrollment", getEnrollmentByCourse);
  
courseRouter.post("/:course_id/student/:student_id",newEnrollment);

courseRouter.post("/:course_id/batch",newEnrollmentBatch);

courseRouter.delete("/:course_id/student/:student_id", deleteEnrollment);


export { courseRouter };