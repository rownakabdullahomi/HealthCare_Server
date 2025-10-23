import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helpers/pick";
import { DoctorService } from "./doctor.service";
import { doctorFilterableFields } from "./doctor.constant";
import sendResponse from "../../shared/sendResponse";

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, doctorFilterableFields);

  const result = await DoctorService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully!",
    meta: result.meta,
    data: result.data
  })
});
const updateIntoDb = catchAsync(async (req: Request, res: Response) => {
 
  const {id} = req.params;
  const result = await DoctorService.updateIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully!",
    data: result
  })
});
const getAISuggestions = catchAsync(async (req: Request, res: Response) => {
 
  const result = await DoctorService.getAISuggestions(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI suggestions fetched successfully!",
    data: result
  })
});



export const DoctorController = {
  getAllFromDb,
  updateIntoDb,
  getAISuggestions
};
