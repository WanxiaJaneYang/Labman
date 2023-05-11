import { Router } from "express";

import { getCourse} from "../controllers/course/apiFunctions/getCourse.js";
import { newCourse} from "../controllers/course/apiFunctions/postCourse.js";
import { updateCourse} from "../controllers/course/apiFunctions/putCourse.js";
import { deleteCourse} from "../controllers/course/apiFunctions/deleteCourse.js";

const courseRouter = Router();

//query users
courseRouter.get("/", getCourse);
  
//insert a new user/student
courseRouter.post("/", newCourse);

courseRouter.put("/:course_id", updateCourse);

courseRouter.delete("/:course_id", deleteCourse);

export { courseRouter };