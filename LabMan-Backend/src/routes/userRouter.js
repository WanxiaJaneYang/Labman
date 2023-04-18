import { Router } from "express";

import { getAllUsers} from "../controllers/users/getUsers.js";
import { newUser} from "../controllers/users/postUsers.js";

const userRouter = Router();

//query all users
userRouter.get("/", getAllUsers);
  
//insert a new user/student
userRouter.post("/", newUser);

export { userRouter };