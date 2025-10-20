import express from "express";
import { ScheduleController } from "./schedule.controller";


const router = express.Router();

router.get("/", ScheduleController.schedulesForDoctor)
router.post("/", ScheduleController.insertIntoDb)

export const ScheduleRoutes = router;