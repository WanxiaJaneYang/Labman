import { Router } from "express";
import { updateAnnouncement, getAnnouncement } from "../controllers/announcement/announcement.js";
const announceRouter = Router();

announceRouter.put("/", updateAnnouncement);
announceRouter.get("/", getAnnouncement);

export { announceRouter };