import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDb(req.body);


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
   const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
   const filters = pick(req.query, ["startDateTime", "endDateTime"])
 
  const result = await ScheduleService.schedulesForDoctor(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDb,
  schedulesForDoctor
};
