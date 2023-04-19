import { Router } from "express";

import { getUser} from "../controllers/users/getUsers.js";
import { newUser} from "../controllers/users/postUsers.js";
import { updateUser} from "../controllers/users/putUser.js";
import { deleteUser} from "../controllers/users/deleteUsers.js";

const userRouter = Router();

//query users
userRouter.get("/", getUser);
  
//insert a new user/student
userRouter.post("/", newUser);

userRouter.put("/:user_id", updateUser);

userRouter.delete("/:user_id", deleteUser);

export { userRouter };