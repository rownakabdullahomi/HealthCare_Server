import express from "express";
import { DoctorController } from "./doctor.controller";

const router = express.Router();

router.get("/", DoctorController.getAllFromDb)

router.post("/suggestion", DoctorController.getAISuggestions)

router.patch("/:id", DoctorController.updateIntoDb)


export const DoctorRoutes = router;