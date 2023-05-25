import express from "express";
import { Router } from "express";
import { requestRouter } from "./requestRouter.js";
import { userRouter } from "./userRouter.js";
import { eqpmtRouter } from "./eqpmtRouter.js";
import { logRouter } from "./logRouter.js";
import { returnRouter } from "./returnRouter.js";
import {typePackageRouter} from "./typePackageRouter.js"
import { courseRouter } from "./courseRouter.js";
import { announceRouter } from "./announceRouter.js";

const v1Router = Router();
v1Router.use(express.json());

// Define route handlers for your index router
v1Router.get("/", (req, res) => {
	// Logic for handling the root route
	res.send("Hello from the index router!");
});

v1Router.use("/request", requestRouter);
v1Router.use("/return", returnRouter);
v1Router.use("/equipment", eqpmtRouter);
v1Router.use("/users", userRouter);
v1Router.use("/logs", logRouter);
v1Router.use("/package",typePackageRouter);
v1Router.use("/course", courseRouter);
v1Router.use("/announcement", announceRouter);

export { v1Router };
