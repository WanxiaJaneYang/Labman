import { Router } from "express";
import express from "express";
import { getAllUsers} from '../controllers/users/getUsers.js';
import { newUser} from '../controllers/users/postUsers.js';

const userRouter = Router();
userRouter.use(express.json());

//query all users
userRouter.get("/", getAllUsers);
  
//insert a new user/student
userRouter.post("/", newUser);


export { userRouter };