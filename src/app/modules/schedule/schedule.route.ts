import express from "express";
import { ScheduleController } from "./schedule.controller";


const router = express.Router();

router.get("/", ScheduleController.schedulesForDoctor)
router.post("/", ScheduleController.insertIntoDb)
router.delete("/:id", ScheduleController.deleteScheduleFromDb)

export const ScheduleRoutes = router;