import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../helpers/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient created successfully.",
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ["status", "role", "email", "searchTerm"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
  
  const result = await UserService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieve successfully.",
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createPatient,
  getAllFromDB,
};
