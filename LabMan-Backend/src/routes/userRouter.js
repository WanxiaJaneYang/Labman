import { Router } from "express";
import { getAllUsers, getUserByName} from '../controllers/users/getUsers.js';
import { newUser} from '../controllers/users/postUsers.js';
import { deleteUser} from '../controllers/users/deleteUsers.js';
import { editUser } from '../controllers/users/putUsers.js';

const userRouter = Router();

//query all users
userRouter.get("/", getAllUsers);

//query get a users by name
userRouter.get("/:user_name", getUserByName);
  
//insert a new user/student
userRouter.post("/", newUser);

//edit a user by query
userRouter.put("/", editUser);

//Delete a user 
userRouter.delete("/", deleteUser);


export { userRouter };