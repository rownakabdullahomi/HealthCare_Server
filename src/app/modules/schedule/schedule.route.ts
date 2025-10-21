import express from "express";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = express.Router();

router.get("/", auth(UserRole.DOCTOR, UserRole.ADMIN), ScheduleController.schedulesForDoctor)
router.post("/", ScheduleController.insertIntoDb)
router.delete("/:id", ScheduleController.deleteScheduleFromDb)

export const ScheduleRoutes = router;