import { Router } from "express";

import { getUser, getUserByStudentID} from "../controllers/users/getUsers.js";
import { newUser} from "../controllers/users/postUsers.js";
import { updateUser} from "../controllers/users/putUser.js";
import { deleteUser} from "../controllers/users/deleteUsers.js";

const userRouter = Router();

//query users
userRouter.get("/", getUser);
userRouter.get("/:student_id", getUserByStudentID);
  
//insert a new user/student
userRouter.post("/", newUser);

userRouter.put("/:student_id", updateUser);

userRouter.delete("/:student_id", deleteUser);

export { userRouter };