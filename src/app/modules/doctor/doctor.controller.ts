import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helpers/pick";
import { DoctorService } from "./doctor.service";
import { doctorFilterableFields } from "./doctor.constant";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, doctorFilterableFields);

  const result = await DoctorService.getAllFromDB(filters, options);
});

export const DoctorController = {
  getAllFromDB,
};
