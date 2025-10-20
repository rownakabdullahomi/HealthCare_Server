import { Request, Response } from "express"
import catchAsync from "../../shared/catchAsync"
import { DoctorScheduleService } from "./doctorSchedule.service"
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";


const insertIntoDb = catchAsync(async (req: Request & {user?: IJWTPayload}, res: Response)=>{
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDb(user as IJWTPayload, req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Schedule Created Successfully.",
        data: result
    })
})

export const DoctorScheduleController = {
    insertIntoDb
}